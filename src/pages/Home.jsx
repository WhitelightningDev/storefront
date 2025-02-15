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
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch Products based on selected category
    const fetchProducts = async () => {
      const categoryQuery = selectedCategory
        ? `category/${selectedCategory}`
        : "";
      const response = await fetch(
        `https://fakestoreapi.com/products${
          categoryQuery ? `/${categoryQuery}` : ""
        }`
      );
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [selectedCategory]); // Fetch products every time category changes

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Select best sellers (you can adjust the logic here to choose items)
  const bestSellers = products.slice(0, 5); // Taking the first 5 products as best sellers

  return (
    <Container className="mt-4">
      {/* Carousel showcasing best sellers */}
      <div
        id="myCarousel"
        className="carousel slide mb-6"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {bestSellers.map((_, index) => (
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              key={index}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                className="d-block w-100"
                src={product.image}
                alt={product.title}
                style={{ height: "400px", objectFit: "contain" }}
              />
              <div className="carousel-caption d-none d-md-block custom-caption">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{`$${product.price}`}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <Row>
        {/* Sidebar for filtering categories */}
        <Col md={3} className="mb-4 mt-3">
          <div className="border p-3 rounded">
            <h4>Filter by Category</h4>
            <Form.Group controlId="categorySelect">
              <Form.Control
                as="select"
                onChange={handleCategoryChange}
                className="mb-3"
              >
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
                    <Card.Img
                      className="card-img"
                      variant="top"
                      src={product.image}
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>{`$${product.price}`}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => addToCart(product)} // Add to cart on click
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="link"
                        onClick={() =>
                          (window.location.href = `/product/${product.id}`)
                        } // Navigates to product details page
                      >
                        View Details
                      </Button>
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
