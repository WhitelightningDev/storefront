import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
// CartContext is used to store and manage cart data globally in the application.
const CartContext = createContext();

/**
 * CartProvider component is the context provider that holds the cart data
 * and provides methods to manipulate the cart (add, remove, clear).
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - The child components that will have access to the cart context
 */
export const CartProvider = ({ children }) => {
  // useState hook to manage the cart state
  const [cart, setCart] = useState(() => {
    // On initial render, check if there is saved cart data in local storage
    const savedCart = localStorage.getItem("cart");
    // If there is, parse it and use as initial state, otherwise set to an empty array
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // useEffect hook to sync cart data with local storage whenever cart state changes
  useEffect(() => {
    // Update local storage with the latest cart data whenever cart state is modified
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); // Dependency array ensures this effect runs when cart state changes

  /**
   * Function to add an item to the cart. If the item with the same ID and options already exists,
   * the quantity is increased by 1. Otherwise, a new item is added with a quantity of 1.
   * 
   * @param {object} product - The product to be added to the cart
   */
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the item with the same ID and options already exists in the cart
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.options) === JSON.stringify(product.options) // Compare product options
      );

      // If the item exists, update the quantity; if not, add it to the cart
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && JSON.stringify(item.options) === JSON.stringify(product.options)
            ? { ...item, quantity: item.quantity + 1 } // Increase quantity if item already in cart
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }]; // Add new item to cart with quantity 1
      }
    });
  };

  /**
   * Function to remove an item from the cart. If the item quantity is more than 1,
   * it decreases the quantity by 1. If the quantity is 1, it removes the item completely.
   * 
   * @param {string} id - The ID of the product to be removed
   * @param {object} options - The options associated with the product (e.g., size, color)
   */
  const removeFromCart = (id, options) => {
    setCart((prevCart) => {
      // Find the existing item based on ID and options
      const existingItem = prevCart.find(
        (item) =>
          item.id === id &&
          JSON.stringify(item.options) === JSON.stringify(options)
      );

      // If the item exists and its quantity is greater than 1, reduce the quantity by 1
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id && JSON.stringify(item.options) === JSON.stringify(options)
            ? { ...item, quantity: item.quantity - 1 } // Decrease quantity
            : item
        );
      } else {
        // If the item quantity is 1, remove the item completely
        return prevCart.filter(
          (item) =>
            !(item.id === id && JSON.stringify(item.options) === JSON.stringify(options))
        );
      }
    });
  };

  /**
   * Function to clear the entire cart (e.g., used after checkout).
   */
  const clearCart = () => {
    setCart([]); // Reset cart state to an empty array
  };

  return (
    // Providing the cart state and manipulation methods to the context consumers
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children} {/* Render child components */}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
// This hook allows other components to easily access the cart context and its methods.
export const useCart = () => useContext(CartContext);
