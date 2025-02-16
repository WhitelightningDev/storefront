// api.js
const API_URL = "https://fakestoreapi.com";

// Fetch categories
export const getCategories = async () => {
  const response = await fetch(`${API_URL}/products/categories`);
  const data = await response.json();
  return data;
};

// Fetch products based on category
export const getProductsByCategory = async (category) => {
  const categoryQuery = category ? `/category/${category}` : '';
  const response = await fetch(`${API_URL}/products${categoryQuery}`);
  const data = await response.json();
  return data;
};

// Fetch all products
export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data;
};
