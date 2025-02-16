import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import "../styles/Wishlist.css"; // Import custom styling

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <Container className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col key={product.id} md={4} className="wishlist-item">
              <Card className="wishlist-card">
                <div className="wishlist-img-wrapper">
                  <Card.Img variant="top" src={product.image} className="wishlist-img" />
                </div>
                <Card.Body className="wishlist-body">
                  <Card.Title className="wishlist-title-text">{product.title}</Card.Title>
                  <Card.Text className="wishlist-price">${product.price.toFixed(2)}</Card.Text>
                  <div className="wishlist-buttons">
                    <Button
                      variant="primary"
                      onClick={() => addToCart(product)}
                      className="wishlist-cart-btn"
                    >
                      <FaShoppingCart /> Add to Cart
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeFromWishlist(product.id)}
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
