import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SelectFieldOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  error?: string;
  className?: string;
  contentClassName?: string;
}

export function SelectField({
  id,
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  error,
  className = "w-full",
  contentClassName = "",
}: SelectFieldProps) {
  return (
    <div className="space-y-1 w-[500px] max-w-md">
      {label && (
        <Label htmlFor={id} className="block mb-1">
          {label}
        </Label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-[var(--error-color)]">{error}</p>}
    </div>
  );
}
