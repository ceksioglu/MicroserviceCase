import React from 'react';

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;  // Make className optional
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
