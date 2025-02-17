import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getAllProducts, getCategories } from "../services/api"; // Import API calls
import "../styles/ProductsPage.css"; // Custom CSS file for Products Page

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
                    <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                    <Link to={`/product/${product.id}`} className="btn btn-link">View Description</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default ProductsPage;
