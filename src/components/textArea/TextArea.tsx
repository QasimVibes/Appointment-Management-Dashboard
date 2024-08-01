import { TextAreaProps } from "@/types/types";

const TextArea: React.FC<TextAreaProps> = ({
  name,
  id,
  value,
  onChange,
  rows = 4,
  className = "",
  ...props
}) => {
  return (
    <textarea
      rows={rows}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={`${className}`}
      {...props}
    />
  );
};

export default TextArea;
