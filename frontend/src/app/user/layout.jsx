'use client';

import { useAuth } from '@/context/AuthContext';
import { Package, User, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserLayout({ children }) {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to access this area.</p>
          <Link 
            href="/login"
            className="mt-4 inline-block text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/user/dashboard', label: 'Dashboard', icon: Package },
    { href: '/user/myorders', label: 'My Orders', icon: ShoppingBag },
    { href: '/user/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">User Dashboard</h1>
            </div>
            <nav className="flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === item.href
                        ? 'text-violet-600 bg-violet-50'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
