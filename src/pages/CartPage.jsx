import React from "react";
import { useCart } from "../context/CartContext";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/CartPage.css"; // Ensure you create this CSS file

/**
 * CartPage component displays the user's shopping cart.
 * It shows a list of products in the cart, the option to adjust quantities,
 * and a summary of the order.
 */
const CartPage = () => {
  // Get cart data and actions (addToCart, removeFromCart) from CartContext
  const { cart, addToCart, removeFromCart } = useCart();

  // Calculate the total amount of the cart by reducing the cart array
  // The total is computed as price * quantity for each item
  const totalAmount = cart
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(2); // Format to two decimal places

  return (
    <div className="container cart-container">
      <h2 className="text-center cart-title">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        // If the cart is empty, display this message
        <div className="empty-cart">
          <h4>Your cart is empty.</h4>
          <p>Start adding products to your cart.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <Row>
          {/* Cart Items Section */}
          <Col md={8} className="cart-items-container">
            {cart.map((product) => (
              <Card key={product.id} className="cart-item">
                <Row className="align-items-center">
                  {/* Product Image */}
                  <Col xs={3}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fluid
                      className="cart-item-img"
                    />
                  </Col>

                  {/* Product Details */}
                  <Col xs={6}>
                    <h5 className="cart-item-title">{product.title}</h5>
                    <p className="cart-item-price">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Display the selected options for this product (if any) */}
                    {product.options && (
                      <ul>
                        {Object.entries(product.options).map(([key, value]) => (
                          <li key={key}>{`${
                            key.charAt(0).toUpperCase() + key.slice(1)
                          }: ${value}`}</li>
                        ))}
                      </ul>
                    )}
                    <p className="cart-item-quantity">
                      Quantity: {product.quantity}
                    </p>
                  </Col>

                  {/* Quantity controls and Remove button */}
                  <Col xs={3} className="text-end">
                    <div className="quantity-controls">
                      {/* Decrease Quantity Button */}
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          removeFromCart(product.id, product.options)
                        } // Pass id and options to remove product
                      >
                        -
                      </Button>
                      <span className="mx-2">{product.quantity}</span>
                      {/* Increase Quantity Button */}
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => addToCart(product)} // Pass the whole product to add to cart
                      >
                        +
                      </Button>
                    </div>
                    {/* Remove Product Button */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() =>
                        removeFromCart(product.id, product.options)
                      } // Pass id and options to remove product
                      className="mt-2 btn-remove w-100"
                    >
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
                  <span>${totalAmount}</span> {/* Display the total amount */}
                </div>
                <div className="summary-item">
                  <span>Shipping:</span>
                  <span>Free</span>{" "}
                  {/* Static text for shipping, can be dynamic based on cart */}
                </div>
                <hr />
                <div className="summary-total">
                  <span>Total:</span>
                  <span>${totalAmount}</span>{" "}
                  {/* Total amount displayed here */}
                </div>

                {/* Continue Shopping and Proceed to Checkout Buttons */}
                <div className="summary-buttons">
                  <Link to="/">
                    <Button variant="secondary" className="back-button">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link to="/checkout">
                    <Button
                      variant="primary"
                      className="checkout-button"
                      disabled={cart.length === 0} // Disable checkout if cart is empty
                    >
                      Proceed to Checkout
                    </Button>
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
