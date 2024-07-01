import React from "react";

export default function Input({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  className = "",
  labelClassName = "",
  ...props
}: any) {
  return (
    <div className="flex flex-col mb-[12px]">
      <label htmlFor={name} className={labelClassName}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        {...props}
      />
    </div>
  );
}
