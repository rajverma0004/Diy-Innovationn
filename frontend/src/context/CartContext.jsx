'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  // Calculate price for a single item based on its kits
  const calculateItemPrice = (item) => {
    if (item.price) return item.price;
    if (item.kits && item.kits.length > 0) {
      return item.kits.reduce((sum, kit) => sum + (kit.kitPrice || 0), 0);
    }
    return 0;
  };

  // Fetch cart from backend when user is authenticated
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) {
        // If not authenticated, try to get cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/cart/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCart(data.items.map(item => ({
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            images: item.productId.images,
            kits: item.productId.kits,
            quantity: item.quantity
          })));
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated]);

  // Calculate total whenever cart changes
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => {
      const itemPrice = calculateItemPrice(item);
      return sum + (itemPrice * (item.quantity || 1));
    }, 0);
    setTotal(newTotal);

    // Save to localStorage if not authenticated
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      // Handle local cart
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item._id === product._id);
        if (existingItem) {
          return prevCart.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
      return;
    }

    // Handle backend cart
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.items.map(item => ({
          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          images: item.productId.images,
          kits: item.productId.kits,
          quantity: item.quantity
        })));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) {
      setCart(prevCart => prevCart.filter(item => item._id !== productId));
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.items.map(item => ({
          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          images: item.productId.images,
          kits: item.productId.kits,
          quantity: item.quantity
        })));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!isAuthenticated) {
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.items.map(item => ({
          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          images: item.productId.images,
          kits: item.productId.kits,
          quantity: item.quantity
        })));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      setCart([]);
      localStorage.removeItem('cart');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/cart/clear', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCart([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const value = {
    cart,
    loading,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}