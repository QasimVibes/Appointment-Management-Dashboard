import { SelectProps } from "@/types/types";

const SelectBox = ({
  name,
  id,
  value,
  options,
  onChange,
  className = "",
  optionText = "Select a time",
  ...props
}: SelectProps) => {
  return (
    <select
      name={name}
      id={id}
      value={value || ""}
      onChange={onChange}
      className={className}
      {...props}
    >
      <option value="">{optionText}</option>
      {options?.map((option) => (
        <option key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
