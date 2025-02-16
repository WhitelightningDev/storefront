import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'; // The Home page component
import CartPage from './pages/CartPage'; // Cart page component (to be created)
import ProductDetails from './pages/ProductDetails'; // Import the ProductDetails page
import { CartProvider } from './context/CartContext';
import CustomNavbar from './components/Navbar'; // Import the Navbar
import 'bootstrap-icons/font/bootstrap-icons.css';
import CheckoutPage from './pages/CheckoutPage'; // Checkout page component
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from "./pages/Wishlist";  // Adjust the path if needed


function App() {
  return (
    <WishlistProvider>
    <CartProvider>
      <Router>
        <CustomNavbar /> {/* Add Navbar above the Routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default route for Home page */}
          <Route path="/cart" element={<CartPage />} /> {/* Route for Cart page */}
          <Route path="/product/:id" element={<ProductDetails />} /> {/* Dynamic route for Product Details page */}
          <Route path="/checkout" element={<CheckoutPage />} /> {/* Route for Checkout page */}
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
    </CartProvider>
    </WishlistProvider>
  );
}

export default App;
