interface FormHeaderProps {
  title: string;
  description: string;
  containerClassName?: string;
}

export function FormHeader({
  title,
  description,
  containerClassName = "mb-6",
}: FormHeaderProps) {
  return (
    <div className={`flex items-start justify-between ${containerClassName}`}>
      <div>
        <h2 className="text-2xl font-semibold mb-1 text-[var(--text-color)]">
          {title}
        </h2>
        <p className="text-[var(--text-tertiary)] text-sm">{description}</p>
      </div>
    </div>
  );
}
