import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, ListGroup, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  // Modal state for additional details
  const [showDetails, setShowDetails] = useState(false);

  // State for selected color and size
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Available options for dropdowns
  const availableColors = ['Red', 'Blue', 'Black', 'White', 'Green'];
  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    // Fetch product details
    const fetchProductDetails = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select a color and size before adding to cart.');
      return;
    }

    const productWithSelection = {
      ...product,
      selectedColor,
      selectedSize,
    };

    addToCart(productWithSelection);
  };

  if (!product) {
    return <p>Loading product details...</p>;
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

      {/* Modal for Additional Details with Dropdowns */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Category:</strong> {product.category}</ListGroup.Item>
            <ListGroup.Item><strong>Stock:</strong> {Math.floor(Math.random() * 50) + 1} available</ListGroup.Item>

            {/* Color Dropdown */}
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

            {/* Size Dropdown */}
            <ListGroup.Item>
              <Form.Group>
                <Form.Label><strong>Select Size:</strong></Form.Label>
                <Form.Control
                  as="select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Choose a size</option>
                  {availableSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </ListGroup.Item>
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
