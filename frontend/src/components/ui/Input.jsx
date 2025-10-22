import React from 'react';

export const Input = ({ className = '', label, error, ...props }) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={`mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};