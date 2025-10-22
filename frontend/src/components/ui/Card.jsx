import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-5 sm:px-6 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};