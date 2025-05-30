'use client';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/context/CartContext';

export default function MainLayout({ children }) {
  return (
    <CartProvider>
      <div>
        <Navbar />
        <main>
          {children}
        </main>
      </div>
    </CartProvider>
  );
}