import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "./index";

export interface CheckboxFieldProps {
  label: string;
  description?: string;
  className?: string;
}

export function CheckboxField({
  label,
  description,
  className,
}: CheckboxFieldProps) {
  const field = useFieldContext();
  const error = field.state.meta.errors?.[0];
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Checkbox
          id={field.name}
          name={field.name}
          checked={Boolean(field.state.value)}
          onCheckedChange={(checked: boolean) => field.handleChange(checked)}
          onBlur={field.handleBlur}
        />
        <Label htmlFor={field.name}>{label}</Label>
      </div>
      {description && (
        <div className="text-xs text-[var(--text-tertiary)] mt-1 ml-6">
          {description}
        </div>
      )}
      {error && (
        <p className="text-sm text-[var(--error-color)] mt-1">{error}</p>
      )}
    </div>
  );
}
