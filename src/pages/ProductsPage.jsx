import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getAllProducts, getCategories } from "../services/api"; // Import API calls
import "../styles/ProductsPage.css"; // Custom CSS file for Products Page
import ProductOptionPopup from '../components/ProductOptionPopup'; // Import the Product Option Popup

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true); // Show the popup to select options
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedOptions({});
  };

  const handleOptionChange = (optionType, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionType]: value,
    }));
  };

  const handleAddToCartWithOptions = () => {
    addToCart({ ...selectedProduct, options: selectedOptions });
    handlePopupClose(); // Close popup after adding to cart
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Our Products</h2>

      {categories.map((category) => (
        <div key={category} className="category-section mb-5">
          <h3 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <Row>
            {products.filter(product => product.category === category).map((product) => (
              <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
                <Card className="product-card shadow-sm">
                  <Card.Img className="card-img" variant="top" src={product.image} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-title">{product.title}</Card.Title>
                    <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>
                    <Button variant="outline-danger" className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                      {wishlist.some((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />} Wishlist
                    </Button>
                    <Button variant="primary" onClick={() => handleAddToCartClick(product)}>Add to Cart</Button>
                    <Link to={`/product/${product.id}`} className="btn btn-link">View Description</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}

      {/* Product Option Popup */}
      <ProductOptionPopup 
        show={showPopup} 
        product={selectedProduct} 
        onClose={handlePopupClose} 
        onConfirm={handleAddToCartWithOptions} 
      />
    </Container>
  );
};

export default ProductsPage;
