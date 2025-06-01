import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "./index";

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  autoComplete?: string;
}

export function TextField({
  label,
  className = "",
  autoComplete,
}: TextFieldProps) {
  const field = useFieldContext();
  const error = field.state.meta.errors?.[0];

  return (
    <div className={className}>
      <Label htmlFor={field.name} className="mb-1 block">
        {label}
      </Label>
      <Input
        id={field.name}
        name={field.name}
        aria-invalid={!!error}
        className={`mb-1 ${className}`}
        autoComplete={autoComplete}
        value={String(field.state.value ?? "")}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {error && (
        <p className="text-sm text-[var(--error-color)] mt-1">{error}</p>
      )}
    </div>
  );
}
