import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Form, Container, Spinner, Alert } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ToastService from "../services/ToastService";
import { getCategories, getProductsByCategory } from "../services/api";
import ProductOptionPopup from "../components/ProductOptionPopup"; // Import the popup
import "../styles/Home.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";  // Import Link for navigation

const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(""); // State for error handling
  const [selectedProduct, setSelectedProduct] = useState(null); // State for product pop-up
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out", offset: 120 });
    window.addEventListener("resize", AOS.refresh);
    return () => window.removeEventListener("resize", AOS.refresh);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = {};
      try {
        for (let category of categories) {
          const products = await getProductsByCategory(category);
          productsData[category] = products.slice(0, 3);
        }
        setProductsByCategory(productsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchProducts();
    }
  }, [categories]);

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

  const handleAddToCart = (product) => {
    if (product.category.includes("clothing") || product.category.includes("jewelery") || product.category.includes("electronics")) {
      setSelectedProduct(product);
    } else {
      addToCart(product);
    }
  };

  const handleConfirmOptions = (options) => {
    addToCart({ ...selectedProduct, options });
    setSelectedProduct(null);
  };

  const filteredProducts = selectedCategory
    ? productsByCategory[selectedCategory]
    : Object.values(productsByCategory).flat();

  const bestSellers = filteredProducts.slice(0, 5);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Container className="mt-4">
      {/* Product Option Pop-up */}
      <ProductOptionPopup show={!!selectedProduct} product={selectedProduct} onClose={() => setSelectedProduct(null)} onConfirm={handleConfirmOptions} />

      {/* Toast Notification */}
      <ToastService message={toastMessage} show={showToast} onClose={() => setShowToast(false)} bg="success" />

      {loading ? (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "50vh" }}>
          <Spinner animation="border" role="status" />
          <p className="mt-3">Fetching products...</p>
        </div>
      ) : error ? (
        <div className="error-container d-flex flex-column align-items-center">
          <img src="/goshoplogo-192x192.png" alt="Error Logo" className="error-logo mb-4" />
          <Alert variant="danger" className="error-message">
            <h5>{error}</h5>
            <p>We encountered an issue while fetching data. Please try again later.</p>
          </Alert>
        </div>
      ) : (
        <>
          {/* Carousel for Best Sellers */}
          <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {bestSellers.map((_, index) => (
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : "false"} aria-label={`Slide ${index + 1}`} key={index}></button>
              ))}
            </div>
            <div className="carousel-inner">
              {bestSellers.map((product, index) => (
                <div key={product.id} className={`carousel-item ${index === 4 ? "active" : ""}`}>
                  <img className="d-block w-100" src={product.image} alt={product.title} style={{ height: "400px", objectFit: "contain" }} />
                  <div className="carousel-caption d-none d-md-block">
                    <Card className="shadow-sm">
                      <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>
                        <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                        <Button variant="outline-danger" className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                          {wishlist.some((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />} Wishlist
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Section */}
          <div className="category-dropdown mb-4" data-aos="fade-up">
            <h4>Filter by Category</h4>
            <Form.Group controlId="categorySelect">
              <Form.Control as="select" onChange={handleCategoryChange} value={selectedCategory}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>

          {/* Product Cards Section */}
          <Container fluid>
            <Row>
              {filteredProducts.map((product) => (
                <Col key={product.id} md={4} sm={6} xs={12} className="mb-4 mt-3" data-aos="fade-up">
                  <Card className="product-card shadow-sm">
                    <Card.Img className="card-img" variant="top" src={product.image} />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="product-title">{product.title}</Card.Title>
                      <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>
                      <Button variant="outline-danger" className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                        {wishlist.some((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />} Wishlist
                      </Button>
                      <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                      <Link to={`/product/${product.id}`} className="btn btn-link">View Description</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Home;
