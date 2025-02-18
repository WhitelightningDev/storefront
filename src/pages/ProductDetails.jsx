import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, ListGroup, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetails.css';

/**
 * ProductDetails component - Displays detailed information about a specific product,
 * allows users to select options (e.g., size, color), and add the product to the cart.
 */
const ProductDetails = () => {
  const { id } = useParams(); // Fetch product ID from the URL parameters
  const [product, setProduct] = useState(null); // Stores product details fetched from API
  const { addToCart } = useCart(); // Function to add products to the cart

  // Modal state for additional product details
  const [showDetails, setShowDetails] = useState(false);

  // State for selected options (color, size, etc.) specific to the product category
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedRingSize, setSelectedRingSize] = useState('');
  const [selectedGender, setSelectedGender] = useState(''); // State for gender selection (applicable to clothing)

  // Available options for dropdowns based on product category
  const availableColors = ['Red', 'Blue', 'Black', 'White', 'Green'];
  const availableSizesMen = ['S', 'M', 'L', 'XL', 'XXL'];
  const availableSizesWomen = ['XS', 'S', 'M', 'L', 'XL'];
  const availableStorage = ['500GB', '1TB', '2TB'];
  const availableMetals = ['White Gold', 'Yellow Gold', 'Rose Gold'];
  const availableRingSizes = ['5', '6', '7', '8', '9'];

  /**
   * Fetches the product details from the API when the component is mounted.
   */
  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data); // Sets product details to the state
    };

    fetchProductDetails();
  }, [id]); // Re-fetch if product ID changes

  /**
   * Handles adding the product to the cart with the selected options.
   * It validates whether the user has selected all required options based on the product category.
   */
  const handleAddToCart = () => {
    let productWithSelection = { ...product };

    // Validate selections based on product category
    if (product.category === 'clothing') {
      if (!selectedColor || !selectedSize || !selectedGender) {
        alert('Please select a color, size, and gender before adding to cart.');
        return;
      }
      productWithSelection = { ...productWithSelection, selectedColor, selectedSize, selectedGender };
    } else if (product.category === 'electronics') {
      if (!selectedStorage) {
        alert('Please select a storage size before adding to cart.');
        return;
      }
      productWithSelection = { ...productWithSelection, selectedStorage };
    } else if (product.category === 'jewelery') {
      if (!selectedMetal || !selectedRingSize) {
        alert('Please select a metal type and ring size before adding to cart.');
        return;
      }
      productWithSelection = { ...productWithSelection, selectedMetal, selectedRingSize };
    }

    addToCart(productWithSelection); // Adds the product with selected options to the cart
  };

  if (!product) {
    return <p>Loading product details...</p>; // Display loading message if product is not yet fetched
  }

  return (
    <Container className="mt-4">
      <Row>
        {/* Product Image */}
        <Col md={6} className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </Col>

        {/* Product Details */}
        <Col md={6}>
          <Card className="product-card shadow-sm">
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
              <Card.Text><strong>Price:</strong> ${product.price.toFixed(2)}</Card.Text>

              <div className="d-flex flex-column gap-2 mt-3">
                <Button variant="info" onClick={() => setShowDetails(true)}>
                  View Details
                </Button>
                <Button variant="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Additional Details with Conditional Dropdowns */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Category:</strong> {product.category}</ListGroup.Item>
            <ListGroup.Item><strong>Stock:</strong> {Math.floor(Math.random() * 50) + 1} available</ListGroup.Item>

            {/* Conditional Dropdowns based on Product Category */}
            {product.category === 'clothing' && (
              <>
                {/* Gender Selection (Men's or Women's Clothing) */}
                <ListGroup.Item>
                  <Form.Group>
                    <Form.Label><strong>Select Gender:</strong></Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                    >
                      <option value="">Choose gender</option>
                      <option value="men">Men's Clothing</option>
                      <option value="women">Women's Clothing</option>
                    </Form.Control>
                  </Form.Group>
                </ListGroup.Item>

                {/* Conditional Size Selection */}
                {selectedGender && (
                  <ListGroup.Item>
                    <Form.Group>
                      <Form.Label><strong>Select Size:</strong></Form.Label>
                      <Form.Control
                        as="select"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        <option value="">Choose a size</option>
                        {(selectedGender === 'men' ? availableSizesMen : availableSizesWomen).map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </ListGroup.Item>
                )}

                {/* Color Selection */}
                <ListGroup.Item>
                  <Form.Group>
                    <Form.Label><strong>Select Color:</strong></Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      <option value="">Choose a color</option>
                      {availableColors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </ListGroup.Item>
              </>
            )}

            {product.category === 'electronics' && (
              <>
                {/* Storage Selection for Electronics */}
                <ListGroup.Item>
                  <Form.Group>
                    <Form.Label><strong>Select Storage Size:</strong></Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedStorage}
                      onChange={(e) => setSelectedStorage(e.target.value)}
                    >
                      <option value="">Choose storage size</option>
                      {availableStorage.map((storage) => (
                        <option key={storage} value={storage}>
                          {storage}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </ListGroup.Item>
              </>
            )}

            {product.category === 'jewelery' && (
              <>
                {/* Metal Type Selection for Jewelry */}
                <ListGroup.Item>
                  <Form.Group>
                    <Form.Label><strong>Select Metal Type:</strong></Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedMetal}
                      onChange={(e) => setSelectedMetal(e.target.value)}
                    >
                      <option value="">Choose metal type</option>
                      {availableMetals.map((metal) => (
                        <option key={metal} value={metal}>
                          {metal}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </ListGroup.Item>

                {/* Ring Size Selection for Jewelry */}
                <ListGroup.Item>
                  <Form.Group>
                    <Form.Label><strong>Select Ring Size:</strong></Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedRingSize}
                      onChange={(e) => setSelectedRingSize(e.target.value)}
                    >
                      <option value="">Choose ring size</option>
                      {availableRingSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </ListGroup.Item>
              </>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetails;
