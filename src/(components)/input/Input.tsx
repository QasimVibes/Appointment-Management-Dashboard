interface InputProps {
  id?: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassName?: string;
  maxLength?: number;
  pattern?: string;
  inputMode?: "search" | "email" | "tel" | "text" | "url" | "none" | "numeric" | "decimal";
  autoComplete?: string;
  required?: boolean;
}

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
}) => {
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