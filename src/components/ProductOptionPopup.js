import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProductOptionPopup = ({ show, product, onClose, onConfirm }) => {
  // Hooks must be at the top level
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedScreenSize, setSelectedScreenSize] = useState("");

  // Instead of returning null, we ensure product is defined safely
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

  const handleConfirm = () => {
    const options = {};

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

    onConfirm(options);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Options for {product.title || "Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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


        {product.category?.includes("electronics") && product.title?.toLowerCase().includes("hard drive") && (
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
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

export default ProductOptionPopup;
