import React from 'react';
import { useCart } from '../context/CartContext';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css'; // Ensure you create this CSS file

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  // Calculate total price
  const totalAmount = cart
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <div className="container cart-container">
      <h2 className="text-center cart-title">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h4>Your cart is empty.</h4>
          <p>Start adding products to your cart.</p>
          <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
        </div>
      ) : (
        <Row>
          {/* Cart Items Section */}
          <Col md={8} className="cart-items-container">
            {cart.map((product) => (
              <Card key={product.id} className="cart-item">
                <Row className="align-items-center">
                  <Col xs={3}>
                    <Image src={product.image} alt={product.title} fluid className="cart-item-img" />
                  </Col>
                  <Col xs={6}>
                    <h5 className="cart-item-title">{product.title}</h5>
                    <p className="cart-item-price">${product.price.toFixed(2)}</p>
                    <p className="cart-item-quantity">
                      Quantity: {product.quantity}
                    </p>
                  </Col>
                  <Col xs={3} className="text-end">
                    <div className="quantity-controls">
                      <Button variant="outline-secondary" size="sm" onClick={() => removeFromCart(product.id)}>-</Button>
                      <span className="mx-2">{product.quantity}</span>
                      <Button variant="outline-primary" size="sm" onClick={() => addToCart(product)}>+</Button>
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(product.id)} className="mt-2 w-100 btn-remove">
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>

          {/* Order Summary Section */}
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
                  <Link to="/">
                    <Button variant="secondary" className="back-button">Continue Shopping</Button>
                  </Link>
                  <Link to="/checkout">
                    <Button variant="primary" className="checkout-button" disabled={cart.length === 0}>Proceed to Checkout</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CartPage;
