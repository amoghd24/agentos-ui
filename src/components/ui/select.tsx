import * as React from "react";
import { ChevronDown } from "lucide-react";

// A simplified select component
interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  placeholder = "Select an option",
  className = "",
  children
}) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onValueChange(e.target.value)}
      className={`h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${className}`}
    >
      {placeholder && <option value="default">{placeholder}</option>}
      {children}
    </select>
  );
};

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  className = ""
}) => {
  // This is just a wrapper now since we're using a native select
  return <div className={className}>{children}</div>;
};

interface SelectValueProps {
  children?: React.ReactNode;
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ children, placeholder }) => {
  // Simplified to just return children or placeholder
  return <>{children || placeholder}</>;
};

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectContent: React.FC<SelectContentProps> = ({
  children,
  className = ""
}) => {
  // Not needed for native select
  return <div className={className}>{children}</div>;
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
}; 