import React from 'react';

export interface BadgeProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline' | 'destructive' | 'secondary';
}

export const Badge: React.FC<BadgeProps> = ({ 
  className = '', 
  children, 
  variant = 'default' 
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    outline: 'border border-gray-300 bg-transparent text-gray-700',
    destructive: 'bg-red-600 text-white',
    secondary: 'bg-gray-200 text-gray-700'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

