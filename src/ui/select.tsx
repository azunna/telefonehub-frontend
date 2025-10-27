import React, { useState } from 'react';

export interface SelectProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ 
  children, 
  defaultValue = '', 
  value,
  onValueChange,
  className = '' 
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ className = '', children }) => (
  <button className={`flex items-center justify-between w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}>
    {children}
  </button>
);

export const SelectContent: React.FC<SelectContentProps> = ({ className = '', children }) => (
  <div className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg ${className}`}>
    {children}
  </div>
);

export const SelectItem: React.FC<SelectItemProps> = ({ value, className = '', children }) => (
  <div className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${className}`}>
    {children}
  </div>
);

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder = 'Select...', className = '' }) => (
  <span className={`text-gray-700 ${className}`}>
    {placeholder}
  </span>
);

