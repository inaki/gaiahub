import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryClient } from "@/lib/query-client";

export function useUpdateAvatar() {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!user?.id) {
        throw new Error("No user logged in");
      }

      if (!file) {
        throw new Error("No file provided");
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPEG, PNG, and WebP images are allowed");
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error("File size must be less than 5MB");
      }

      // Get file extension
      const fileExt = file.name.split(".").pop()?.toLowerCase();
      const filePath = `${user.id}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
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
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (profileError) {
        throw new Error(`Profile update failed: ${profileError.message}`);
      }

      return publicUrl;
    },
    onSuccess: () => {
      // Invalidate queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useAvatar(userId?: string) {
  return useQuery({
    queryKey: ["avatar", userId],
    queryFn: async () => {
      if (!userId) return undefined;
      const exts = ["jpg", "jpeg", "png", "webp", "gif"];
      for (const ext of exts) {
        const filePath = `${userId}.${ext}`;
        const { data } = await supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
        // Try fetching the file to verify existence
        if (data?.publicUrl) {
          const res = await fetch(data.publicUrl, { method: "HEAD" });
          if (res.ok) return data.publicUrl;
        }
      }
      return undefined;
    },
    enabled: !!userId,
  });
}
