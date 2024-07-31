import { InputProps } from "@/types/types";

const Input = ({
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
}: InputProps) => {
  return (
    <>
      <label htmlFor={id} className={`block ${labelClassName}`}>
        {label}
      </label>
      <input
        type={type}
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
      />
    </>
  );
};

export default Input;
