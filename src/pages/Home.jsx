// Home.js
import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Container, Toast, ToastContainer } from "react-bootstrap";
import { useCart } from "../context/CartContext"; // Import Cart context
import { useWishlist } from "../context/WishlistContext"; // Import Wishlist context
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Wishlist Icons
import { fetchCategories, fetchProducts } from "../services/api"; // Import API functions
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Fetch Categories
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategoryData();
  }, []);

  // Fetch Products based on selected category
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchProducts(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductData();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Wishlist Functionality
  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
      setToastMessage(`${product.title} removed from wishlist`);
    } else {
      addToWishlist(product);
      setToastMessage(`${product.title} added to wishlist`);
    }
    setShowToast(true); // Show toast notification after updating the wishlist
  };

  // Best Sellers (First 5 Products)
  const bestSellers = products.slice(0, 5);

  return (
    <Container className="mt-4">
      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="success">
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Carousel for Best Sellers */}
      <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
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
            <div key={product.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                className="d-block w-100"
                src={product.image}
                alt={product.title}
                style={{ height: "400px", objectFit: "contain" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>
                    <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                    {/* Wishlist Button Inside Carousel */}
                    <Button variant="outline-danger" className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                      {wishlist.some((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />} Wishlist
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <Row>
        {/* Sidebar for Filtering Categories */}
        <Col md={3} className="mb-4 mt-3">
          <div className="sidebar">
            <h4>Filter by Category</h4>
            <Form.Group controlId="categorySelect">
              <Form.Control as="select" onChange={handleCategoryChange}>
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
                      <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>

                      {/* Wishlist Button */}
                      <Button variant="outline-danger" className="wishlist-btn mb-2" onClick={() => toggleWishlist(product)}>
                        {wishlist.some((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />} Wishlist
                      </Button>

                      {/* Add to Cart & View Details */}
                      <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                      <Button variant="link" onClick={() => (window.location.href = `/product/${product.id}`)}>View Description</Button>
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
