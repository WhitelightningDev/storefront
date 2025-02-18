import React, { useState, useEffect, useRef } from "react";  // Importing useState, useEffect, and useRef for click handling
import { Navbar, Nav, Badge, Container } from "react-bootstrap";  // React Bootstrap components
import { Link } from "react-router-dom";  // React Router for navigation
import { useCart } from "../context/CartContext";  // Custom hook to access cart state
import { useWishlist } from "../context/WishlistContext";  // Custom hook to access wishlist state
import "../styles/CustomNavbar.css";  // Custom CSS
import { FaShoppingCart, FaHeart } from "react-icons/fa";  // Icons for cart and wishlist

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);  // State to track whether the navbar is open
  const { cart } = useCart();  // Accessing cart state
  const { wishlist } = useWishlist();  // Accessing wishlist state
  const navbarRef = useRef(null);  // Reference to the navbar to detect clicks outside

  // Function to toggle navbar state
  const toggleNavbar = () => setIsOpen(!isOpen);

  // Close navbar when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  // Detect click outside of the navbar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);  // Close navbar if clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);  // Add event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);  // Clean up event listener
    };
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar shadow" ref={navbarRef}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo d-flex align-items-center">
          <img
            src="/goshoplogo-512x512.png"
            alt="GoShop Logo"
            width="60"
            height="60"
            className="me-2"
          />
          <span href="/" className="brand-name fw-bold">GoShop</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="border-0"
          onClick={toggleNavbar}  // Toggle navbar open/close state
        />

        <Navbar.Collapse id="navbar-nav" className={isOpen ? "show" : ""}>
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/wishlist"
              className="nav-link wishlist-link"
              onClick={handleLinkClick}  // Close navbar when clicked
            >
              <FaHeart className="nav-icon wishlist-icon" />
              Wishlist{" "}
              {wishlist.length > 0 && (
                <Badge bg="danger" className="badge-count">
                  {wishlist.length}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/cart"
              className="nav-link cart-link"
              onClick={handleLinkClick}  // Close navbar when clicked
            >
              <FaShoppingCart className="nav-icon cart-icon" />
              Cart{" "}
              {cart.length > 0 && (
                <Badge bg="light" text="dark" className="badge-count">
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/products"
              className="nav-link products-link fw-bold"
              onClick={handleLinkClick}  // Close navbar when clicked
            >
              Products
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
