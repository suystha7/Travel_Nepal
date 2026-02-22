import React from "react";

interface ITitleProps {
  label?: string;
  primaryText: string;
  highlightText?: string;
  className?: string;
  underline?: boolean;
}

const Title = ({
  label,
  primaryText,
  highlightText,
  className = "",
  underline = true,
}: ITitleProps) => {
  return (
    <div className={`text-center mb-10 ${className}`}>
      {label && (
        <p className="text-gray-500 font-medium mb-2 text-base uppercase tracking-wide">
          {label}
        </p>
      )}
      {underline && (
        <div className="mb-2 flex justify-center">
          <span className="h-[3px] w-20 bg-blue-500 rounded"></span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 relative inline-block">
        {primaryText && <span className="text-primary-500">{primaryText}</span>}
        {"  "}
        {highlightText && (
          <span className="text-tertiary-500">{highlightText}</span>
        )}
      </h2>
    </div>
  );
};

export default Title;
