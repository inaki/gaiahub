import { useAppForm } from "@/components/form-elements";
import { FormHeader } from "@/components/form-elements/FormHeader";
import { FormFooter } from "@/components/form-elements/FormFooter";
import { useUpdateProfile } from "@/hooks/use-profile";

interface ProfileEditProps {
  profile: {
    name: string;
    email: string;
    bio: string;
    location: string;
    website: string;
    phone?: string;
    instagram?: string;
    tiktok?: string;
    pinterest?: string;
    avatar_url?: string;
  };
  onSave: (values: Record<string, string>) => void;
  onCancel: () => void;
}

export default function ProfileEdit({
  profile,
  onSave,
  onCancel,
}: ProfileEditProps) {
  const form = useAppForm({
    defaultValues: profile,
    onSubmit: async ({ value }) => {
      await handleSave(value);
    },
    validators: {
      onSubmit: ({ value }) => {
        return {
          fields: {
            name: value.name.length < 3 ? "Name is too short!" : undefined,
          },
        };
      },
    },
  });

  const updateProfile = useUpdateProfile();

  const handleSave = async (values: Record<string, string>) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== undefined) as [
        string,
        string
      ][]
    );
    try {
      await updateProfile.mutateAsync(filteredValues);
      onSave(filteredValues);
    } catch (e: unknown) {
      console.error(e);
      // handle error (show toast, etc)
    }
  };

  return (
    <form
      className="max-w-xl mx-auto space-y-4 py-8"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
    >
      <FormHeader
        title="Edit Profile"
        description="Update your profile information."
      />
      {typeof Object.values(form.state.errorMap ?? {})[0] === "string" && (
        <p className="text-sm text-[var(--error-color)] mb-4">
          {Object.values(form.state.errorMap ?? {})[0]}
        </p>
      )}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <form.AppField name="name">
            {(field) => <field.TextField label="Name" autoComplete="name" />}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <field.TextField label="Email" autoComplete="email" disabled />
            )}
          </form.AppField>

          <form.AppField name="location">
            {(field) => (
              <field.TextField label="Location" autoComplete="address-level2" />
            )}
          </form.AppField>
          <form.AppField name="phone">
            {(field) => <field.TextField label="Phone" autoComplete="tel" />}
          </form.AppField>
          <form.AppField name="bio">
            {(field) => <field.TextareaField label="Bio" />}
          </form.AppField>
        </div>
        <div className="flex-1 space-y-4">
          <form.AppField name="website">
            {(field) => <field.TextField label="Website" autoComplete="url" />}
          </form.AppField>
          <form.AppField name="instagram">
            {(field) => (
              <field.TextField label="Instagram" autoComplete="username" />
            )}
          </form.AppField>
          <form.AppField name="tiktok">
            {(field) => (
              <field.TextField label="TikTok" autoComplete="username" />
            )}
          </form.AppField>
          <form.AppField name="pinterest">
            {(field) => (
              <field.TextField label="Pinterest" autoComplete="username" />
            )}
          </form.AppField>
        </div>
      </div>
      <FormFooter onBack={onCancel} isSubmitting={form.state.isSubmitting} />
    </form>
  );
}
