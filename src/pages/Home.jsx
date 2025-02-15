import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Container } from "react-bootstrap";
import { useCart } from "../context/CartContext"; // Import the Cart context
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToCart } = useCart(); // Access the addToCart function

  useEffect(() => {
    // Fetch Categories
    const fetchCategories = async () => {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch Products based on selected category
    const fetchProducts = async () => {
      const categoryQuery = selectedCategory ? `category/${selectedCategory}` : "";
      const response = await fetch(
        `https://fakestoreapi.com/products${categoryQuery ? `/${categoryQuery}` : ""}`
      );
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [selectedCategory]); // Fetch products every time category changes

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Select best sellers (first 5 products as an example)
  const bestSellers = products.slice(0, 5);

  return (
    <Container className="mt-4">
      <Row>
        {/* Sidebar for filtering categories */}
        <Col md={3} className="mb-4 mt-3">
          <div className="border p-3 rounded sidebar">
            <h4>Filter by Category</h4>
            <Form.Group controlId="categorySelect">
              <Form.Control as="select" onChange={handleCategoryChange} className="mb-3">
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </Col>

        {/* Products Display Section */}
        <Col md={9}>
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col key={product.id} md={4} className="mb-4 mt-3">
                  <Card className="product-card shadow-sm">
                    <Card.Img className="card-img" variant="top" src={product.image} />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="product-title">{product.title}</Card.Title>
                      <div className="mt-auto">
                        <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>
                        <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                        <Button variant="link" onClick={() => (window.location.href = `/product/${product.id}`)}>View Details</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>No products available in this category</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
