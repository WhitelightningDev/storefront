import React from "react"; // Import React to build the component
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { Container, Card, Button } from "react-bootstrap"; // Import necessary components from react-bootstrap
import "../styles/OrderConfirmation.css"; // Import custom styles for OrderConfirmation component

/**
 * OrderConfirmation component that displays an order confirmation message
 * to the user after a successful purchase.
 * 
 * @returns {JSX.Element} - The rendered OrderConfirmation component.
 */
const OrderConfirmation = () => {
  return (
    <Container className="order-confirmation-container"> {/* A container to wrap the confirmation message */}
      <Card className="order-confirmation-card"> {/* Card component for visual presentation */}
        <Card.Body>
          <h2 className="order-title">🎉 Order Confirmed!</h2> {/* Display confirmation title */}
          <p>Thank you for your purchase! Your order has been placed successfully.</p> {/* Thank the user for the order */}
          
          {/* Button to redirect the user back to the homepage */}
          <Link to="/"> 
            <Button variant="primary" className="order-home-btn">Back to Home</Button> 
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderConfirmation; // Export the component for use in other parts of the app
