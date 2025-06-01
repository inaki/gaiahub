import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";
import { useProfile } from "@/hooks/use-profile";

export function Profile() {
  const { profile } = useProfile();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  console.log("profile", profile);

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!profile) return <div>Loading...</div>;

  return isEditing ? (
    <ProfileEdit
      profile={profile}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  ) : (
    <ProfileView profile={profile} onEdit={() => setIsEditing(true)} />
  );
}
