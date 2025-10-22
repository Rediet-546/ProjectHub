import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button className="md:hidden">
          <Bars3Icon className="h-6 w-6 text-gray-500" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        <div className="flex items-center space-x-4">
          {/* Add search, notifications, etc. here */}
        </div>
      </div>
    </header>
  );
};