import React from "react";

const SelectBox = ({
  options,
  value,
  onChange,
  className = "",
  ...props
}: any) => {
  return (
    <select value={value} {...props} className={className}>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
