import React, { useState } from "react";
import { InputProps } from "@/types/types";
import Image from "next/image";
import { showPassword, hidePassword } from "../../../public";

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  className = "",
  labelClassName = "",
  maxLength,
  pattern,
  inputMode,
  autoComplete,
  required,
  checked,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <label htmlFor={id} className={`block ${labelClassName}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" && isPasswordVisible ? "text" : type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={className}
          maxLength={maxLength}
          pattern={pattern}
          inputMode={inputMode}
          autoComplete={autoComplete}
          required={required}
          checked={checked}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[22px] transform -translate-y-1/2 text-[16px]"
          >
            <Image
              src={isPasswordVisible ? hidePassword : showPassword}
              alt={isPasswordVisible ? "Hide password" : "Show password"}
              width={14}
              height={14}
            />
          </button>
        )}
      </div>
    </>
  );
};

export default Input;
