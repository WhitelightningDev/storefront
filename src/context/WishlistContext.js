import React, { createContext, useContext, useState } from "react";

// Create a Wishlist Context
// WishlistContext is used to store and manage wishlist data globally in the application.
const WishlistContext = createContext();

/**
 * WishlistProvider component is the context provider that holds the wishlist data
 * and provides methods to manipulate the wishlist (add, remove).
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - The child components that will have access to the wishlist context
 */
export const WishlistProvider = ({ children }) => {
  // useState hook to manage the wishlist state, initialized as an empty array
  const [wishlist, setWishlist] = useState([]);

  /**
   * Function to add a product to the wishlist. 
   * It first checks if the product is already in the wishlist, and if not, adds it to the list.
   * 
   * @param {object} product - The product to be added to the wishlist
   */
  const addToWishlist = (product) => {
    // If the product is not already in the wishlist, add it to the wishlist
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]); // Add product to wishlist array
    }
  };

  /**
   * Function to remove a product from the wishlist.
   * It filters out the product based on the product ID.
   * 
   * @param {string} id - The ID of the product to be removed from the wishlist
   */
  const removeFromWishlist = (id) => {
    // Filter out the product with the matching ID from the wishlist
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    // Providing the wishlist state and manipulation methods to the context consumers
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children} {/* Render child components */}
    </WishlistContext.Provider>
  );
};

/**
 * Custom hook to access wishlist context.
 * This hook allows other components to easily access the wishlist context and its methods.
 */
export const useWishlist = () => {
  return useContext(WishlistContext);
};
