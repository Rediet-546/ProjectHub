import React from 'react';
import { useAuthStore } from '../../features/auth/authStore.js';
import {
  HomeIcon,
  FolderIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button.jsx';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Analytics', href: '#', icon: ChartBarIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
];

export const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <h1 className="text-xl font-bold text-white">ProjectHub</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {user?.name}
                    </p>
                    <Button variant="link" onClick={logout} className="text-xs p-0 h-auto">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};