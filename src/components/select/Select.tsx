import { SelectProps } from "@/types/types";

const SelectBox = ({
  options,
  value,
  onChange,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <select value={value} onChange={onChange} className={className} {...props}>
      <option value="">Select a time</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
