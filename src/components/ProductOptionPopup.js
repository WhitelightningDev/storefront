import React, { useState } from "react";
// Importing necessary components from react-bootstrap for Modal, Button, and Form
import { Modal, Button, Form } from "react-bootstrap";

/**
 * ProductOptionPopup component renders a modal that allows users to select product options
 * based on the product category. It supports clothing, jewelry, and electronics categories.
 * 
 * @param {object} props
 * @param {boolean} props.show - Controls the visibility of the modal.
 * @param {object} props.product - The product data, used to display the available options.
 * @param {function} props.onClose - Function to close the modal.
 * @param {function} props.onConfirm - Function to confirm and pass the selected options.
 */
const ProductOptionPopup = ({ show, product, onClose, onConfirm }) => {
  // Local state hooks for storing selected options
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedScreenSize, setSelectedScreenSize] = useState("");

  // If the product is not provided, display a modal indicating no product details are available
  if (!product) return <Modal show={show} onHide={onClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Product Not Found</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>No product details available.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>;

  // Function to handle the confirmation of selected options
  const handleConfirm = () => {
    // Object to store selected options
    const options = {};

    // Logic to check the product category and set corresponding options
    if (product.category?.includes("clothing")) {
      options.size = selectedSize;
      options.color = selectedColor;
    } else if (product.category?.includes("jewelery")) {
      options.metal = selectedMetal;
      options.size = selectedSize;
    } else if (product.category?.includes("electronics")) {
      if (product.title?.toLowerCase().includes("tv")) {
        options.screenSize = selectedScreenSize;
      } else if (product.title?.toLowerCase().includes("hard drive")) {
        options.storage = selectedStorage;
      }
    }

    // Pass selected options back to the parent component via onConfirm callback
    onConfirm(options);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Options for {product.title || "Product"}</Modal.Title> {/* Title with product name */}
      </Modal.Header>
      <Modal.Body>
        {/* Conditional rendering for clothing-related options */}
        {product.category?.includes("clothing") && (
          <>
            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control as="select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <option value="">Select Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Color</Form.Label>
              <Form.Control as="select" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                <option value="">Select Color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
              </Form.Control>
            </Form.Group>
          </>
        )}

        {/* Conditional rendering for jewelry-related options */}
        {product.category?.includes("jewelery") && (
          <>
            <Form.Group>
              <Form.Label>Metal Type</Form.Label>
              <Form.Control as="select" value={selectedMetal} onChange={(e) => setSelectedMetal(e.target.value)}>
                <option value="">Select Metal</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Size</Form.Label>
              <Form.Control as="select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <option value="">Select Size</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </Form.Control>
            </Form.Group>
          </>
        )}

        {/* Conditional rendering for electronics-related options, especially for hard drives */}
        {product.category?.includes("electronics") && 
          (product.title?.toLowerCase().includes("hard drive") || product.title?.toLowerCase().includes("ssd")) && (
          <Form.Group>
            <Form.Label>Storage Size</Form.Label>
            <Form.Control as="select" value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)}>
              <option value="">Select Storage Size</option>
              <option value="500GB">500GB</option>
              <option value="1TB">1TB</option>
              <option value="2TB">2TB</option>
              <option value="4TB">4TB</option>
            </Form.Control>
          </Form.Group>
        )}

        {/* Conditional rendering for TV-specific screen size options */}
        {product.category?.includes("electronics") && product.title?.toLowerCase().includes("tv") && (
          <Form.Group>
            <Form.Label>Screen Size</Form.Label>
            <Form.Control as="select" value={selectedScreenSize} onChange={(e) => setSelectedScreenSize(e.target.value)}>
              <option value="">Select Screen Size</option>
              <option value="32">32 inches</option>
              <option value="42">42 inches</option>
              <option value="55">55 inches</option>
              <option value="65">65 inches</option>
            </Form.Control>
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* Button to cancel and close the modal */}
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        
        {/* Confirm button, disabled if no options are selected */}
        <Button 
          variant="primary" 
          onClick={handleConfirm} 
          disabled={!selectedSize && !selectedColor && !selectedMetal && !selectedStorage && !selectedScreenSize}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Exporting ProductOptionPopup component for use in other parts of the application
export default ProductOptionPopup;
