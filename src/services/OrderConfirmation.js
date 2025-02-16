import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import "../styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  return (
    <Container className="order-confirmation-container">
      <Card className="order-confirmation-card">
        <Card.Body>
          <h2 className="order-title">🎉 Order Confirmed!</h2>
          <p>Thank you for your purchase! Your order has been placed successfully.</p>
          <Link to="/">
            <Button variant="primary" className="order-home-btn">Back to Home</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderConfirmation;
