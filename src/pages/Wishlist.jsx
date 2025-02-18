import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useWishlist } from "../context/WishlistContext"; // Custom context to manage wishlist
import { useCart } from "../context/CartContext"; // Custom context to manage cart
import { FaShoppingCart, FaTrash } from "react-icons/fa"; // Import icons for cart and delete buttons
import "../styles/Wishlist.css"; // Import custom styling for Wishlist page

/**
 * Wishlist component displays the user's saved wishlist items and allows them to add items to the cart or remove them.
 * 
 * @component
 * @example
 * return (
 *   <Wishlist />
 * )
 */
const Wishlist = () => {
  // Retrieve the wishlist and removeFromWishlist function from the wishlist context
  const { wishlist, removeFromWishlist } = useWishlist(); 
  // Retrieve the addToCart function from the cart context
  const { addToCart } = useCart();

  /**
   * handleAddToCart function adds the selected product to the cart and removes it from the wishlist.
   * 
   * @param {Object} product - The product object to be added to the cart and removed from the wishlist
   */
  const handleAddToCart = (product) => {
    addToCart(product); // Adds the product to the cart
    removeFromWishlist(product.id); // Removes the product from the wishlist by its ID
  };

  return (
    <Container className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      {/* Check if the wishlist is empty */}
      {wishlist.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p> // Display a message if the wishlist is empty
      ) : (
        <Row>
          {/* Loop through the wishlist items and display them in a grid format */}
          {wishlist.map((product) => (
            <Col key={product.id} md={4} className="wishlist-item">
              {/* Card component to display each wishlist item */}
              <Card className="wishlist-card">
                <div className="wishlist-img-wrapper">
                  {/* Display product image */}
                  <Card.Img variant="top" src={product.image} className="wishlist-img" />
                </div>
                <Card.Body className="wishlist-body">
                  {/* Display product title */}
                  <Card.Title className="wishlist-title-text">{product.title}</Card.Title>
                  {/* Display product price */}
                  <Card.Text className="wishlist-price">${product.price.toFixed(2)}</Card.Text>
                  <div className="wishlist-buttons">
                    {/* Add to Cart button */}
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(product)} // Trigger handleAddToCart when clicked
                      className="wishlist-cart-btn"
                    >
                      <FaShoppingCart /> Add to Cart
                    </Button>
                    {/* Remove from Wishlist button */}
                    <Button
                      variant="danger"
                      onClick={() => removeFromWishlist(product.id)} // Trigger removeFromWishlist when clicked
                      className="wishlist-remove-btn"
                    >
                      <FaTrash /> Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Wishlist;
