import { ButtonProps } from "@/types/types";
export default function Button({
  text,
  onClick,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <>
      <button onClick={onClick} className={className} {...props}>
        {children || text}
      </button>
    </>
  );
}
