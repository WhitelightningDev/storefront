import React from "react";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // Import Wishlist context
import "../styles/CustomNavbar.css"; // Custom CSS file for additional styling
import { FaShoppingCart, FaHeart } from "react-icons/fa"; // Import icons

const CustomNavbar = () => {
  const { cart } = useCart(); // Get cart items
  const { wishlist } = useWishlist(); // Get wishlist items

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/" className="brand-logo">
        <img
          src="/goshoplogo-512x512.png" // Assuming logo.png is in the public folder
          alt="GoShop Logo"
          width="50"
          height="50"
          className="d-inline-block align-top"
        />
        <span className="brand-name">GoShop</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          {/* Wishlist Icon */}
          <Nav.Link as={Link} to="/wishlist" className="wishlist-link">
            <FaHeart className="wishlist-icon" /> Wishlist{" "}
            {wishlist.length > 0 && (
              <Badge bg="danger" className="wishlist-badge">
                {wishlist.length}
              </Badge>
            )}
          </Nav.Link>

          {/* Cart Icon */}
          <Nav.Link as={Link} to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" /> Cart{" "}
            {cart.length > 0 && (
              <Badge bg="light" text="dark" className="cart-badge">
                {cart.length}
              </Badge>
            )}
          </Nav.Link>

          {/* Products Page Link */}
          <Nav.Link as={Link} to="/products" className="products-link">
            Products
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
