import { SelectProps } from "@/types/types";
const SelectBox = ({
  options,
  value,
  onChange,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <select value={value} {...props} className={className}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
