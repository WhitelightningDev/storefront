import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Container } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ToastService from "../services/ToastService";  // Import the ToastService
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const categoryQuery = selectedCategory ? `category/${selectedCategory}` : "";
      const response = await fetch(`https://fakestoreapi.com/products${categoryQuery ? `/${categoryQuery}` : ""}`);
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
      setToastMessage(`${product.title} removed from wishlist`);
    } else {
      addToWishlist(product);
      setToastMessage(`${product.title} added to wishlist`);
    }
    setShowToast(true);
  };

  const bestSellers = products.slice(0, 5);

  return (
    <Container className="mt-4">
      {/* Toast Notification */}
      <ToastService 
        message={toastMessage} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        bg="success" // You can dynamically change this based on success or error
      />

      {/* Carousel for Best Sellers */}
      <div id="myCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
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

      {/* Category Dropdown Section */}
      <div className="category-dropdown mb-4">
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


      {/* Product Cards */}
      <Container fluid>
        <Row>
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product.id} md={3} sm={6} xs={12} className="mb-4 mt-3">
                <Card className="product-card shadow-sm">
                  <Card.Img className="card-img" variant="top" src={product.image} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-title">{product.title}</Card.Title>
                    <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>
                    <Button variant="outline-danger" className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                      {wishlist.some((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />} Wishlist
                    </Button>
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
      </Container>
    </Container>
  );
};

export default Home;
