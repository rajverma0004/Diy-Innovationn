'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const { cart } = useCart();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/browse" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md">
                Browse
              </Link>
              <Link href="/community" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md">
                Community
              </Link>
            </div>

            <div className="flex items-center">
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}