const API_URL = "https://fakestoreapi.com";

// Function to handle fetch requests with error handling
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Oops! The requested resource was not found (404). Please check the URL.");
      }
      if (response.status === 401) {
        throw new Error("Unauthorized access (401). It seems you don't have permission to access this resource.");
      }
      if (response.status === 500) {
        throw new Error("Something went wrong on our end (500). Please try again later.");
      }
      throw new Error("An unknown error occurred while fetching data. Please try again.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred while fetching data.");
  }
};

// Fetch categories
export const getCategories = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_URL}/products/categories`);
    return data;
  } catch (error) {
    throw new Error(`There was an Error fetching categories: ${error.message}`);
  }
};

// Fetch products based on category
export const getProductsByCategory = async (category) => {
  try {
    const categoryQuery = category ? `/category/${category}` : '';
    const data = await fetchWithErrorHandling(`${API_URL}/products${categoryQuery}`);
    return data;
  } catch (error) {
    throw new Error(`Error fetching products by category: ${error.message}`);
  }
};

// Fetch all products
export const getAllProducts = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_URL}/products`);
    return data;
  } catch (error) {
    throw new Error(`Error fetching all products: ${error.message}`);
  }
};
