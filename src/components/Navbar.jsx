import React from "react";
// Importing necessary components from react-bootstrap for Navbar, Nav, Badge, and Container
import { Navbar, Nav, Badge, Container } from "react-bootstrap";
// Importing Link component from react-router-dom for navigation without page refresh
import { Link } from "react-router-dom";
// Importing useCart hook to access cart state from CartContext
import { useCart } from "../context/CartContext";
// Importing useWishlist hook to access wishlist state from WishlistContext
import { useWishlist } from "../context/WishlistContext";
// Importing custom CSS for the Navbar styling
import "../styles/CustomNavbar.css";
// Importing icons from react-icons for the Cart and Wishlist icons
import { FaShoppingCart, FaHeart } from "react-icons/fa";

/**
 * CustomNavbar component renders the top navigation bar with options for the wishlist, cart, and products.
 * It also displays dynamic badges showing the count of items in the wishlist and cart.
 */
const CustomNavbar = () => {
  // Destructuring cart and wishlist states from their respective context hooks
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    // Navbar component with dark background and a shadow effect
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar shadow">
      <Container>
        {/* Brand name and logo linking to the home page */}
        <Navbar.Brand as={Link} to="/" className="brand-logo d-flex align-items-center">
          {/* Displaying logo */}
          <img
            src="/goshoplogo-512x512.png"  // Logo image source
            alt="GoShop Logo"  // Alt text for the logo image
            width="60"  // Width of the logo
            height="60"  // Height of the logo
            className="me-2"  // Right margin for spacing between logo and brand name
          />
          <span href="/" className="brand-name fw-bold">GoShop</span> {/* Brand name text */}
        </Navbar.Brand>

        {/* Toggle button for collapsing the Navbar on smaller screens */}
        <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />
        
        {/* Collapsible content of the Navbar */}
        <Navbar.Collapse id="navbar-nav">
          {/* Main navigation links */}
          <Nav className="ms-auto align-items-center">
            
            {/* Wishlist link with icon and item count */}
            <Nav.Link as={Link} to="/wishlist" className="nav-link wishlist-link">
              <FaHeart className="nav-icon wishlist-icon" /> {/* Heart icon for wishlist */}
              Wishlist{" "}
              {/* Conditional rendering of badge if wishlist has items */}
              {wishlist.length > 0 && (
                <Badge bg="danger" className="badge-count">
                  {wishlist.length}  {/* Displaying count of items in wishlist */}
                </Badge>
              )}
            </Nav.Link>

            {/* Cart link with icon and item count */}
            <Nav.Link as={Link} to="/cart" className="nav-link cart-link">
              <FaShoppingCart className="nav-icon cart-icon" /> {/* Shopping cart icon */}
              Cart{" "}
              {/* Conditional rendering of badge if cart has items */}
              {cart.length > 0 && (
                <Badge bg="light" text="dark" className="badge-count">
                  {cart.length}  {/* Displaying count of items in cart */}
                </Badge>
              )}
            </Nav.Link>

            {/* Link to products page */}
            <Nav.Link as={Link} to="/products" className="nav-link products-link fw-bold">
              Products  {/* Products link text */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Exporting CustomNavbar component for use in other parts of the application
export default CustomNavbar;
