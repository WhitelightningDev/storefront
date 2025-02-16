import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/CheckoutPage.css"; // Ensure to create this CSS file

const CheckoutPage = () => {
  const { cart, removeFromCart } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false); // state to toggle the checkout form
  const [showSuccessPage, setShowSuccessPage] = useState(false); // state to show the success page after order is complete

  // Calculate total price
  const totalAmount = cart
    .reduce((acc, product) => acc + product.price, 0)
    .toFixed(2);

  const handleConfirmOrder = () => {
    setShowCheckoutForm(true); // Show the checkout form when confirm order is clicked
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if the form is valid
    if (e.target.checkValidity() === false) {
      e.stopPropagation(); // Prevent form submission if validation fails
    } else {
      // If the form is valid, show the success page
      setShowSuccessPage(true);
    }

    // Mark the form as touched to show validation messages
    e.target.classList.add("was-validated");
  };

  if (showSuccessPage) {
    return (
      <div className="container success-page text-center">
        <Image
          src="../goshoplogo-512x512.png"
          alt="Logo"
          className="success-logo"
          width="150"
          height="150"
        />
        <h2>Thank you for your order!</h2>
        <p>Your order has been successfully placed. We will notify you once it ships.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container checkout-container">
      <h2 className="text-center checkout-title">Checkout</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h4>Your cart is empty.</h4>
          <p>Please add products before proceeding.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <Row style={{ display: showCheckoutForm ? "none" : "block" }}>
          {/* Product List */}
          <Col md={8} className="checkout-items-container">
            {cart.map((product) => (
              <Card key={product.id} className="checkout-item">
                <Row className="align-items-center">
                  <Col xs={3}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fluid
                      className="checkout-item-img"
                    />
                  </Col>
                  <Col xs={6}>
                    <h5 className="checkout-item-title">{product.title}</h5>
                    <p className="checkout-item-price">
                      ${product.price.toFixed(2)}
                    </p>
                  </Col>
                  <Col xs={3} className="text-right">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </Button>
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
                    <Button variant="secondary" className="back-button">
                      Back to Cart
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    className="checkout-button"
                    onClick={handleConfirmOrder}
                    disabled={cart.length === 0}
                  >
                    Confirm Order
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Checkout Form */}
      {showCheckoutForm && (
        <div className="checkout-form-container">
          <main>
            <div className="py-5 text-center">
              <img
                className="d-block mx-auto mb-4"
                src="../goshoplogo-512x512.png"
                alt=""
                width="120"
                height="120"
                style={{ border: "1px solid black", borderRadius: "30px" }}
              />
              <h2>Checkout Form</h2>
            </div>

            <div className="row g-5">
              <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-primary">Your cart</span>
                  <span className="badge bg-primary rounded-pill">
                    {cart.length}
                  </span>
                </h4>
                <ul className="list-group mb-3">
                  {cart.map((product) => (
                    <li
                      className="list-group-item d-flex justify-content-between lh-sm"
                      key={product.id}
                    >
                      <div>
                        <h6 className="my-0">{product.title}</h6>
                        <small className="text-body-secondary">
                          Brief description
                        </small>
                      </div>
                      <span className="text-body-secondary">
                        ${product.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${totalAmount}</strong>
                  </li>
                </ul>
              </div>

              <div className="col-md-7 col-lg-8">
                <h4 className="mb-3">Billing Address</h4>
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmitOrder}
                >
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        required
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        required
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="address2" className="form-label">
                        Address 2 (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Apartment or suite"
                      />
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select className="form-select" id="country" required>
                        <option value="">Choose...</option>
                        <option>United States</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <select className="form-select" id="state" required>
                        <option value="">Choose...</option>
                        <option>California</option>
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="zip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        required
                      />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3">Payment</h4>
                  <div className="my-3">
                    <div className="form-check">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        checked
                        required
                      />
                      <label className="form-check-label" htmlFor="credit">
                        Credit card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="debit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                      />
                      <label className="form-check-label" htmlFor="debit">
                        Debit card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        PayPal
                      </label>
                    </div>
                  </div>

                  <button
                    className="w-100 btn btn-primary btn-lg"
                    type="submit"
                  >
                    Confirm Payment
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
