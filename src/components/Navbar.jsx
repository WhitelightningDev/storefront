import React from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CustomNavbar.css'; // Custom CSS file for additional styling

const CustomNavbar = () => {
  const { cart } = useCart(); // Get the cart items

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/" className="brand-logo">
        <img
          src="/goshoplogo-512x512.png" // Assuming logo.png is in the public folder
          alt="ShopSphere Logo"
          width="50"
          height="50"
          className="d-inline-block align-top"
        />
        <span className="brand-name">GoShop</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          {/* Other links can go here */}
        </Nav>
        {/* Cart icon on the right */}
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/cart" className="cart-link">
            Cart{' '}
            <Badge variant="light" className="cart-badge">
              {cart.length}
            </Badge>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
