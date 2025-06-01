import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, MapPin, Link as LinkIcon, Calendar, Camera } from "lucide-react";
import ProfileCommunities from "./ProfileCommunities";
import ProfileStats from "./ProfileStats";
import ProfileActivity from "./ProfileActivity";
import ProfileParticipation from "./ProfileParticipation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarUploadDialog } from "./AvatarUploadDialog";

export default function ProfileView({
  profile,
  onEdit,
}: {
  profile: any;
  onEdit: () => void;
}) {
  const [tab, setTab] = useState("overview");
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const joinedDate = profile.created_at ? new Date(profile.created_at) : null;
  const joinedText = joinedDate
    ? `Joined ${joinedDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}`
    : "Joined date unavailable";

  // Placeholder for avatar upload logic
  const handleAvatarSave = async (file: File) => {
    // TODO: Upload to Supabase Storage and update profile.avatar_url
    // You can use your existing mutation logic here
    // Example: await updateProfile.mutateAsync({ avatar_url: uploadedUrl });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center py-8 gap-8">
      {/* Main Profile Card and Communities */}
      <div className="flex flex-col items-center w-full max-w-sm">
        <Card className="w-full max-w-sm flex flex-col items-center">
          <CardContent className="flex flex-col items-center p-8">
            {/* Avatar with edit icon */}
            <div className="relative">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src={
                    profile.avatar_url ||
                    "https://avatar.iran.liara.run/public/girl"
                  }
                  alt={profile.name || profile.email}
                />
                <AvatarFallback>
                  {profile.name
                    ? profile.name[0].toUpperCase()
                    : profile.email?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="ghost"
                className="absolute bottom-0 right-0 rounded-full border hover:bg-primary hover:text-primary-foreground"
                onClick={() => setAvatarDialogOpen(true)}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <AvatarUploadDialog
                open={avatarDialogOpen}
                onOpenChange={setAvatarDialogOpen}
                currentAvatarUrl={profile.avatar_url}
                onSave={handleAvatarSave}
              />
            </div>
            {/* Name */}
            <div className="font-bold text-2xl mb-1 text-center">
              {profile.name || "No Name"}
            </div>
            {/* Email */}
            <div className="text-muted-foreground mb-4 text-center">
              {profile.email || "No email"}
            </div>
            {/* Edit Button */}
            <Button className="mb-6" variant="outline" onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            {/* Location */}
            <div className="flex items-center gap-2 text-sm mb-2 w-full">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>
                {profile.location || (
                  <span className="text-muted-foreground">No location</span>
                )}
              </span>
            </div>
            {/* Website */}
            <div className="flex items-center gap-2 text-sm mb-2 w-full">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              {profile.website ? (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {profile.website}
                </a>
              ) : (
                <span className="text-muted-foreground">No website</span>
              )}
            </div>
            {/* Joined Date */}
            <div className="flex items-center gap-2 text-sm mb-4 w-full">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{joinedText}</span>
            </div>
            {/* Bio */}
            <div className="w-full">
              <div className="font-semibold text-sm mb-1">Bio</div>
              <div className="text-muted-foreground text-sm">
                {profile.bio || "No bio provided."}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Communities Section */}
        <div className="w-full mt-8">
          <ProfileCommunities communities={profile.communities || []} />
        </div>
      </div>
      {/* Right Column: Tabs, Stats, and Activity */}
      <div className="flex-1 flex flex-col gap-6 max-w-2xl">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-1 rounded border ${
              tab === "overview" ? "bg-muted font-semibold" : "bg-transparent"
            }`}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>
          {/* <button
            className={`px-4 py-1 rounded border ${
              tab === "activity" ? "bg-muted font-semibold" : "bg-transparent"
            }`}
            onClick={() => setTab("activity")}
          >
            Activity
          </button> */}
          <button
            className={`px-4 py-1 rounded border ${
              tab === "participation"
                ? "bg-muted font-semibold"
                : "bg-transparent"
            }`}
            onClick={() => setTab("participation")}
          >
            Participation
          </button>
        </div>
        {tab === "overview" && (
          <>
            <ProfileStats stats={profile.stats || {}} />
            <ProfileActivity activity={profile.recentActivity || []} />
          </>
        )}
        {/* {tab === "activity" && (
          <div className="bg-white dark:bg-background rounded-xl shadow border p-8">
            Activity tab content goes here.
          </div>
        )} */}
        {tab === "participation" && (
          <ProfileParticipation participation={profile.participation || {}} />
        )}
      </div>
    </div>
  );
}
