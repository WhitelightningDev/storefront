import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

/**
 * Home component - Displays products, categories, and wishlist options on the homepage.
 * Handles product filtering by category and pop-up for selecting product options before adding to cart.
 */
const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState({}); // Stores products by category
  const [categories, setCategories] = useState([]); // Stores available categories
  const [toastMessage, setToastMessage] = useState(""); // Stores message for toast notifications
  const [loading, setLoading] = useState(true); // Indicates loading state for fetching products
  const [showToast, setShowToast] = useState(false); // Controls visibility of toast notification
  const [selectedCategory, setSelectedCategory] = useState(""); // Stores the selected category filter
  const [error, setError] = useState(""); // Stores error message for failed fetch
  const [selectedProduct, setSelectedProduct] = useState(null); // Stores selected product for pop-up
  const { addToCart } = useCart(); // Function to add products to the cart
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Wishlist functions
  // Navigation hook for routing

  /**
   * Initializes AOS (Animate on Scroll) library for animations and refreshes on resize.
   */
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out", offset: 120 });
    window.addEventListener("resize", AOS.refresh);
    return () => window.removeEventListener("resize", AOS.refresh);
  }, []);

  /**
   * Fetches categories from the API when the component is mounted.
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data); // Set categories to state
      } catch (error) {
        setError(error.message); // Set error message on failure
        setLoading(false); // End loading on error
      }
    };
    fetchCategories();
  }, []);

  /**
   * Fetches products by category after categories are loaded.
   * Limits the number of products displayed to 3 per category.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = {};
      try {
        for (let category of categories) {
          const products = await getProductsByCategory(category);
          productsData[category] = products.slice(0, 3); // Limit to first 3 products
        }
        setProductsByCategory(productsData); // Set products by category to state
        setLoading(false); // End loading when products are fetched
      } catch (error) {
        setError(error.message); // Set error message on failure
        setLoading(false); // End loading on error
      }
    };

    if (categories.length > 0) {
      fetchProducts(); // Fetch products once categories are available
    }
  }, [categories]);

  /**
   * Toggles the wishlist state for a given product.
   * Adds or removes product from wishlist and shows a toast message.
   * 
   * @param {Object} product - The product to be added/removed from the wishlist.
   */
  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id); // Remove product if already in wishlist
      setToastMessage(`${product.title} removed from wishlist`);
    } else {
      addToWishlist(product); // Add product to wishlist
      setToastMessage(`${product.title} added to wishlist`);
    }
    setShowToast(true); // Display toast notification
  };

  /**
   * Handles adding a product to the cart.
   * If the product requires options (e.g., size, color), it triggers the product option pop-up.
   * Otherwise, the product is added directly to the cart.
   * 
   * @param {Object} product - The product to be added to the cart.
   */
  const handleAddToCart = (product) => {
    if (product.category.includes("clothing") || product.category.includes("jewelery") || product.category.includes("electronics")) {
      setSelectedProduct(product); // Set selected product for pop-up
    } else {
      addToCart(product); // Add directly to cart
    }
  };

  /**
   * Confirms the selected options (e.g., size, color) and adds the product to the cart.
   * 
   * @param {Object} options - The selected options for the product.
   */
  const handleConfirmOptions = (options) => {
    addToCart({ ...selectedProduct, options }); // Add product with options to the cart
    setSelectedProduct(null); // Close the pop-up
  };

  /**
   * Filters the displayed products based on the selected category.
   */
  const filteredProducts = selectedCategory
    ? productsByCategory[selectedCategory] // Filter by selected category
    : Object.values(productsByCategory).flat(); // Flatten the products if no category is selected

  const bestSellers = filteredProducts.slice(0, 5); // Get top 5 best sellers

  /**
   * Handles category selection change.
   * 
   * @param {Event} e - The event triggered by category selection change.
   */
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Update selected category state
  };

  return (
    <Container className="mt-4">
      {/* Product Option Pop-up */}
      <ProductOptionPopup 
        show={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onConfirm={handleConfirmOptions} 
      />

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
