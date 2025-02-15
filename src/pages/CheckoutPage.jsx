import React from 'react';
import { useCart } from '../context/CartContext';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/CheckoutPage.css'; // Ensure to create this CSS file

const CheckoutPage = () => {
  const { cart, removeFromCart } = useCart();

  // Calculate total price
  const totalAmount = cart.reduce((acc, product) => acc + product.price, 0).toFixed(2);

  return (
    <div className="container checkout-container">
      <h2 className="text-center checkout-title">Checkout</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h4>Your cart is empty.</h4>
          <p>Please add products before proceeding.</p>
          <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
        </div>
      ) : (
        <Row>
          {/* Product List */}
          <Col md={8} className="checkout-items-container">
            {cart.map((product) => (
              <Card key={product.id} className="checkout-item">
                <Row className="align-items-center">
                  <Col xs={3}>
                    <Image src={product.image} alt={product.title} fluid className="checkout-item-img" />
                  </Col>
                  <Col xs={6}>
                    <h5 className="checkout-item-title">{product.title}</h5>
                    <p className="checkout-item-price">${product.price.toFixed(2)}</p>
                  </Col>
                  <Col xs={3} className="text-right">
                    <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(product.id)}>Remove</Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>

          {/* Order Summary */}
          <Col md={4}>
            <Card className="order-summary">
              <Card.Body>
                <h4 className="summary-title">Order Summary</h4>
                <hr />
                <div className="summary-item">
                  <span>Subtotal:</span>
                  <span>${totalAmount}</span>
                </div>
                <div className="summary-item">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="summary-total">
                  <span>Total:</span>
                  <span>${totalAmount}</span>
                </div>
                <div className="summary-buttons">
                  <Link to="/cart">
                    <Button variant="secondary" className="back-button">Back to Cart</Button>
                  </Link>
                  <Button variant="primary" className="checkout-button" disabled={cart.length === 0}>Confirm Order</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CheckoutPage;
