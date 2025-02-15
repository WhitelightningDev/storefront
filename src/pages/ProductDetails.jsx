import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Importing the cart context
import '../styles/ProductDetails.css'; // Custom styling for the product details page

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch product details based on ID
    const fetchProductDetails = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6} className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </Col>
        <Col md={6}>
          <Card className="product-card shadow-sm">
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text><strong>Price: </strong>${product.price}</Card.Text>
              <Button variant="primary" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
