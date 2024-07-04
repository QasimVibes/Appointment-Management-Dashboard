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
    <>
      <label htmlFor={name} className={`block ${labelClassName}`}>
        {label}
      </label>
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
    </>
  );
}
