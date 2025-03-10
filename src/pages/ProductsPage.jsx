import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getAllProducts, getCategories } from "../services/api"; // Import API calls to fetch products and categories
import "../styles/ProductsPage.css"; // Custom CSS for styling the Products Page
import ProductOptionPopup from '../components/ProductOptionPopup'; // Popup component for selecting product options

const ProductsPage = () => {
  // States for storing product and category data, popup visibility, selected product, and selected options
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [selectedOptions, setSelectedOptions] = useState({}); // Stores selected options for the product

  // Cart and Wishlist context hooks
  const { addToCart } = useCart(); 
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories(); // API call to fetch categories
      setCategories(data); // Set categories in state
    };
    fetchCategories(); // Execute function
  }, []);

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts(); // API call to fetch products
      setProducts(data); // Set products in state
    };
    fetchProducts(); // Execute function
  }, []);

  // Toggle wishlist status for a product (add or remove from wishlist)
  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id); // Remove product from wishlist if already present
    } else {
      addToWishlist(product); // Add product to wishlist
    }
  };

  // Show product option popup when "Add to Cart" is clicked
  const handleAddToCartClick = (product) => {
    setSelectedProduct(product); // Set selected product
    setShowPopup(true); // Show the product option popup
  };

  // Close the popup and reset selected options
  const handlePopupClose = () => {
    setShowPopup(false); // Hide popup
    setSelectedOptions({}); // Reset selected options
  };

 

  // Add product with selected options to cart and close the popup
  const handleAddToCartWithOptions = () => {
    addToCart({ ...selectedProduct, options: selectedOptions }); // Add product to cart with selected options
    handlePopupClose(); // Close popup after adding to cart
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Our Products</h2>

      {/* Loop through each category and display corresponding products */}
      {categories.map((category) => (
        <div key={category} className="category-section mb-5">
          <h3 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <Row>
            {/* Loop through products and filter by category */}
            {products.filter(product => product.category === category).map((product) => (
              <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
                <Card className="product-card shadow-sm">
                  {/* Product Image */}
                  <Card.Img className="card-img" variant="top" src={product.image} />
                  <Card.Body className="d-flex flex-column">
                    {/* Product Title and Price */}
                    <Card.Title className="product-title">{product.title}</Card.Title>
                    <Card.Text className="product-price">${product.price.toFixed(2)}</Card.Text>

                    {/* Wishlist Button */}
                    <Button variant="outline-danger" className="wishlist-btn" onClick={() => toggleWishlist(product)}>
                      {wishlist.some((item) => item.id === product.id) ? <FaHeart /> : <FaRegHeart />} Wishlist
                    </Button>

                    {/* Add to Cart Button */}
                    <Button variant="primary" onClick={() => handleAddToCartClick(product)}>Add to Cart</Button>

                    {/* Link to Product Details Page */}
                    <Link to={`/product/${product.id}`} className="btn btn-link">View Description</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}

      {/* Product Option Popup for selecting options before adding to cart */}
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
