import React from 'react';

const Button = ({ className = '', children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };