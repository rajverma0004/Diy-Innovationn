'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, UserCircle, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-gray-800">
                DIY Innovation
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">              <Link href="/browse" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md">
                Browse
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md">
                About Us
              </Link>
              {isAuthenticated && (
                <Link 
                  href={user?.role === 'admin' ? "/admin/dashboard" : "/user/dashboard"} 
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md flex items-center"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/cart" 
                className="relative p-2 text-gray-500 hover:text-gray-900"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-violet-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/user/profile"
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-900"
                  >
                    <UserCircle className="h-6 w-6" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-900 flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-violet-500 text-white hover:bg-violet-600">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}