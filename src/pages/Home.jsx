import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Container } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ToastService from "../services/ToastService"; // Import ToastService
import { getCategories, getProductsByCategory } from "../services/api"; // Import API calls
import "../styles/Home.css";
import AOS from "aos"; // Import AOS

const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  // Removed unused selectedCategory state
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // animation happens only once
      easing: "ease-in-out", // easing function
    });
  }, []);
  

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = {};

      // Loop through each category and fetch the first 3 products
      for (let category of categories) {
        const products = await getProductsByCategory(category);
        productsData[category] = products.slice(0, 3); // Limit to 3 products
      }

      setProductsByCategory(productsData);
    };

    // Fetch products when categories change
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

  const bestSellers = Object.values(productsByCategory).flat().slice(0, 5);

  return (
    <Container className="mt-4">
      {/* Toast Notification */}
      <ToastService
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        bg="success" // Dynamically change this based on success or error
      />

      {/* Carousel for Best Sellers */}
      <div
        id="myCarousel"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
        data-aos="fade-up" // Adding scroll animation here
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
                style={{ height: "340px", objectFit: "contain" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text className="product-price">
                      ${product.price.toFixed(2)}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="wishlist-btn"
                      onClick={() => toggleWishlist(product)}
                    >
                      {wishlist.some((item) => item.id === product.id) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}{" "}
                      Wishlist
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

      <div className="category-dropdown mb-4 shadow-lg border-3 rounded-5">
  <div className="container px-4 py-5" id="hanging-icons">
    <h2 className="pb-2 border-bottom">Favourites</h2>
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      {/* Men's Clothing Favourite */}
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          {/* Dynamically display men's clothing image */}
          <img
            src={
              productsByCategory["men's clothing"]
                ? productsByCategory["men's clothing"][0]?.image
                : "https://via.placeholder.com/40/0000FF/808080?Text=Men'sClothing"
            }
            alt={
              productsByCategory["men's clothing"]
                ? productsByCategory["men's clothing"][0]?.title
                : "Men's Clothing"
            }
            width="40"
            height="40"
          />
        </div>
        <div>
          <h3 className="fs-2 text-body-emphasis">
            {/* Dynamically display men's clothing product name */}
            {productsByCategory["men's clothing"]
              ? productsByCategory["men's clothing"][0]?.title
              : "Men's Classic Jacket"}
          </h3>
          <p>
            {/* You can also dynamically set the description, if available */}
            This men's classic jacket is perfect for the colder months. With its durable outer fabric and comfortable lining, it's a must-have for any wardrobe. Available in various sizes and colors.
          </p>
          <Button variant="primary" onClick={() => addToCart(productsByCategory["men's clothing"] ? productsByCategory["men's clothing"][0] : {})}>
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Women's Clothing Favourite */}
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          {/* Dynamically display women's clothing image */}
          <img
            src={
              productsByCategory["women's clothing"]
                ? productsByCategory["women's clothing"][0]?.image
                : "https://via.placeholder.com/40/FF69B4/FFFFFF?Text=Women'sClothing"
            }
            alt={
              productsByCategory["women's clothing"]
                ? productsByCategory["women's clothing"][0]?.title
                : "Women's Clothing"
            }
            width="40"
            height="40"
          />
        </div>
        <div>
          <h3 className="fs-2 text-body-emphasis">
            {/* Dynamically display women's clothing product name */}
            {productsByCategory["women's clothing"]
              ? productsByCategory["women's clothing"][0]?.title
              : "Women's Summer Dress"}
          </h3>
          <p>
            A lightweight and stylish summer dress for those warm days. Made with breathable fabric and designed with a flattering fit, it's ideal for both casual outings and beach days.
          </p>
          <Button variant="primary" onClick={() => addToCart(productsByCategory["women's clothing"] ? productsByCategory["women's clothing"][0] : {})}>
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Electronics Favourite */}
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          {/* Dynamically display electronics product image */}
          <img
            src={
              productsByCategory["electronics"]
                ? productsByCategory["electronics"][0]?.image
                : "https://via.placeholder.com/40/000000/FFFFFF?Text=Electronics"
            }
            alt={
              productsByCategory["electronics"]
                ? productsByCategory["electronics"][0]?.title
                : "Electronics"
            }
            width="40"
            height="40"
          />
        </div>
        <div>
          <h3 className="fs-2 text-body-emphasis">
            {/* Dynamically display electronics product name */}
            {productsByCategory["electronics"]
              ? productsByCategory["electronics"][0]?.title
              : "Smartphone Pro Max"}
          </h3>
          <p>
            The Smartphone Pro Max offers cutting-edge features such as a high-resolution camera, fast processing speed, and a sleek design. A great choice for tech enthusiasts looking for top-tier performance.
          </p>
          <Button variant="primary" onClick={() => addToCart(productsByCategory["electronics"] ? productsByCategory["electronics"][0] : {})}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Category Dropdown Section */}
      <div className="category-dropdown mb-4">
        <h4>Filter by Category</h4>
        <Form.Group controlId="categorySelect">
          <Form.Control as="select">
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
          {categories.map((category) => (
            <div key={category} className="category-section">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <Row>
                {productsByCategory[category] &&
                  productsByCategory[category].map((product) => (
                    <Col
                      key={product.id}
                      md={4}
                      sm={6}
                      xs={12}
                      className="mb-4 mt-3"
                    >
                      <Card className="product-card shadow-sm">
                        <Card.Img
                          className="card-img"
                          variant="top"
                          src={product.image}
                        />
                        <Card.Body className="d-flex flex-column">
                          <Card.Title className="product-title">
                            {product.title}
                          </Card.Title>
                          <Card.Text className="product-price">
                            ${product.price.toFixed(2)}
                          </Card.Text>
                          <Button
                            variant="outline-danger"
                            className="wishlist-btn"
                            onClick={() => toggleWishlist(product)}
                          >
                            {wishlist.some((item) => item.id === product.id) ? (
                              <FaHeart />
                            ) : (
                              <FaRegHeart />
                            )}{" "}
                            Wishlist
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="link"
                            onClick={() => alert('Redirect to product details')}
                          >
                            View Description
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
