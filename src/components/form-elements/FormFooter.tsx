interface FormFooterProps {
  onBack?: () => void;
  isSubmitting?: boolean;
  backLabel?: string;
  submitLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function FormFooter({
  onBack,
  isSubmitting = false,
  backLabel = "Back",
  submitLabel = "Save",
  disabled = false,
  className = "",
}: FormFooterProps) {
  return (
    <div className={`flex justify-between mt-4 ${className}`}>
      <button
        type="button"
        onClick={onBack}
        className="px-4 py-2 rounded hover:opacity-80"
        style={{
          background: "hsl(var(--muted))",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        {backLabel}
      </button>
      <button
        type="submit"
        className="px-6 py-2 rounded hover:opacity-80 disabled:opacity-50"
        style={{
          background:
            disabled || isSubmitting
              ? "hsl(var(--muted))"
              : "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
        }}
        disabled={disabled || isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}
