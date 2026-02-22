import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  className?: string;
  labelClassName?: string;
  field?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  touched?: boolean;
  showToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const Input = ({
  label,
  name,
  className,
  labelClassName,
  field,
  error,
  ...props
}: InputProps) => {
  return (
    <div>
      <div className={`flex flex-col gap-2`}>
        <label
          className={`typography-extra-large-body text-grey-500 w-full ${labelClassName}`}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          id={name}
          type="text"
          className={`w-full px-5 py-3 typography-extra-large-body font-light text-grey-400 rounded-lg border ${className}`}
          {...field}
          {...props}
        />
        {/* <ErrorMessage name={name} component="div" className="text-red-500 text-sm" /> */}
      </div>
    </div>
  );
};

export default Input;
