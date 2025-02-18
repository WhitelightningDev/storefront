const API_URL = "https://fakestoreapi.com"; // Base URL for the fake store API

/**
 * Function to handle fetch requests with error handling.
 * It fetches data from the provided URL and includes error handling for various HTTP status codes.
 * 
 * @param {string} url - The URL endpoint to fetch data from.
 * @returns {Promise<Object>} - A promise that resolves to the JSON data from the API.
 * @throws {Error} - Throws an error with a message depending on the HTTP status.
 */
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url); // Perform the fetch request to the URL
    if (!response.ok) {
      // Check for different types of HTTP error responses and throw appropriate errors
      if (response.status === 404) {
        throw new Error("Oops! The requested resource was not found (404). Please check the URL.");
      }
      if (response.status === 401) {
        throw new Error("Unauthorized access (401). It seems you don't have permission to access this resource.");
      }
      if (response.status === 500) {
        throw new Error("Something went wrong on our end (500). Please try again later.");
      }
      // Generic error for any other non-OK responses
      throw new Error("An unknown error occurred while fetching data. Please try again.");
    }
    const data = await response.json(); // Parse the response as JSON
    return data; // Return the parsed data
  } catch (error) {
    // Catch and rethrow any errors with a generic message
    throw new Error(error.message || "An error occurred while fetching data.");
  }
};

/**
 * Fetch categories from the API.
 * 
 * @returns {Promise<Array>} - A promise that resolves to an array of categories.
 * @throws {Error} - Throws an error if fetching categories fails.
 */
export const getCategories = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_URL}/products/categories`); // Fetch categories
    return data; // Return the categories data
  } catch (error) {
    // Catch errors and throw them with a custom message
    throw new Error(`There was an Error fetching categories: ${error.message}`);
  }
};

/**
 * Fetch products based on the category from the API.
 * 
 * @param {string} category - The category of products to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of products in the given category.
 * @throws {Error} - Throws an error if fetching products by category fails.
 */
export const getProductsByCategory = async (category) => {
  try {
    const categoryQuery = category ? `/category/${category}` : ''; // If a category is provided, append it to the URL
    const data = await fetchWithErrorHandling(`${API_URL}/products${categoryQuery}`); // Fetch products by category
    return data; // Return the products data
  } catch (error) {
    // Catch errors and throw them with a custom message
    throw new Error(`Error fetching products by category: ${error.message}`);
  }
};

/**
 * Fetch all products from the API.
 * 
 * @returns {Promise<Array>} - A promise that resolves to an array of all products.
 * @throws {Error} - Throws an error if fetching all products fails.
 */
export const getAllProducts = async () => {
  try {
    const data = await fetchWithErrorHandling(`${API_URL}/products`); // Fetch all products
    return data; // Return the products data
  } catch (error) {
    // Catch errors and throw them with a custom message
    throw new Error(`Error fetching all products: ${error.message}`);
  }
};
