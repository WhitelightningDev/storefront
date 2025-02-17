import React from "react";
import { Navbar, Nav, Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "../styles/CustomNavbar.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const CustomNavbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar shadow">
      <Container>
        {/* Logo and Brand Name */}
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

        <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Wishlist */}
            <Nav.Link as={Link} to="/wishlist" className="nav-link wishlist-link">
              <FaHeart className="nav-icon wishlist-icon" />
              Wishlist{" "}
              {wishlist.length > 0 && (
                <Badge bg="danger" className="badge-count">
                  {wishlist.length}
                </Badge>
              )}
            </Nav.Link>

            {/* Cart */}
            <Nav.Link as={Link} to="/cart" className="nav-link cart-link">
              <FaShoppingCart className="nav-icon cart-icon" />
              Cart{" "}
              {cart.length > 0 && (
                <Badge bg="light" text="dark" className="badge-count">
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>

            {/* Products */}
            <Nav.Link as={Link} to="/products" className="nav-link products-link fw-bold">
              Products
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
