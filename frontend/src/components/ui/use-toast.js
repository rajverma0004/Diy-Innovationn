// Simple toast hook for notifications
import { useState, useCallback } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = Date.now();
    const newToast = {
      id,
      title,
      description,
      variant,
    };

    setToasts((currentToasts) => [...currentToasts, newToast]);

    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id)
      );
    }, 3000);
  }, []);

  return { toast, toasts };
}
