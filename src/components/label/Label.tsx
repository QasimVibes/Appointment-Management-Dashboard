import { LabelProps } from "@/types/types";
export default function Label({
  htmlFor,
  label,
  className = "",
  ...props
}: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`block ${className}`} {...props}>
      {label}
    </label>
  );
}
