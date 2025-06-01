import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "./index";

export interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  autoComplete?: string;
}

export function TextareaField({
  label,
  className = "",
  autoComplete,
  ...props
}: TextareaFieldProps) {
  const field = useFieldContext();
  const error = field.state.meta.errors?.[0];

  return (
    <div className={className}>
      <Label htmlFor={field.name} className="mb-1 block">
        {label}
      </Label>
      <Textarea
        id={field.name}
        name={field.name}
        aria-invalid={!!error}
        className={`mb-1 ${className}`}
        autoComplete={autoComplete}
        value={String(field.state.value ?? "")}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...props}
      />
      {error && (
        <p className="text-sm text-[var(--error-color)] mt-1">{error}</p>
      )}
    </div>
  );
}
