import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart data from local storage on initial render
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart data with local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart (increase quantity if item already exists)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.options) === JSON.stringify(product.options) // Check if the options are the same
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && JSON.stringify(item.options) === JSON.stringify(product.options)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart (decrease quantity if more than 1, remove if only 1)
  const removeFromCart = (id, options) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === id &&
          JSON.stringify(item.options) === JSON.stringify(options)
      );
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id && JSON.stringify(item.options) === JSON.stringify(options)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(
          (item) =>
            !(item.id === id && JSON.stringify(item.options) === JSON.stringify(options))
        );
      }
    });
  };

  // Clear cart completely (used after checkout)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => useContext(CartContext);
