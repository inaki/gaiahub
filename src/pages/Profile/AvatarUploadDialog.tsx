import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface AvatarUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatarUrl?: string;
  onSuccess?: (newAvatarUrl: string) => void; // Optional callback for when upload succeeds
}

export function AvatarUploadDialog({
  open,
  onOpenChange,
  currentAvatarUrl,
  onSuccess,
}: AvatarUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    currentAvatarUrl
  );
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!open) {
      setSelectedFile(null);
      setPreviewUrl(currentAvatarUrl);
      setFileName("");
      setIsUploading(false);
    }
  }, [open, currentAvatarUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleSave = async () => {
    if (!selectedFile || !user?.id) {
      toast({
        title: "Error",
        description: "Please select a file and make sure you're logged in.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      console.log("🚀 Starting avatar upload for:", selectedFile.name);

      // Validate file
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        throw new Error("Only JPEG, PNG, and WebP images are allowed");
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (selectedFile.size > maxSize) {
        throw new Error("File size must be less than 5MB");
      }

      // Upload to Supabase Storage
      const fileExt = selectedFile.name.split(".").pop()?.toLowerCase();
      const filePath = `${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, selectedFile, {
          upsert: true,
          contentType: selectedFile.type,
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // Update profile in database
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        throw new Error(`Profile update failed: ${profileError.message}`);
      }

      // Show success message
      toast({
        title: "Success",
        description: "Avatar updated successfully!",
      });

      console.log("✅ Avatar upload completed:", publicUrl);

      // Call success callback if provided
      onSuccess?.(publicUrl);

      // Close dialog
      onOpenChange(false);
    } catch (error: any) {
      console.error("❌ Avatar upload failed:", error);

      toast({
        title: "Upload Failed",
        description:
          error.message || "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
          <DialogDescription>
            Upload a new profile picture. The image will be cropped to fit a
            square.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-2">
          <div className="flex justify-center items-center w-32 h-32">
            <img
              src={previewUrl || "https://avatar.iran.liara.run/public/girl"}
              className="w-28 h-28 rounded-full object-cover border"
              alt="Avatar preview"
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label
              className="font-medium text-sm mb-1"
              htmlFor="avatar-upload-input"
            >
              Upload Image
            </label>
            <div className="flex items-center w-full">
              <input
                id="avatar-upload-input"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="mr-3"
                disabled={isUploading}
              >
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground truncate max-w-[160px]">
                {fileName || "No file chosen"}
              </span>
            </div>
          </div>

          {/* Upload status */}
          {isUploading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Uploading...
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isUploading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
