// Fetch Categories
export const fetchCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Propagate error for handling in the component
    }
  };
  
  // Fetch Products based on selected category
  export const fetchProducts = async (category = "") => {
    try {
      const categoryQuery = category ? `category/${category}` : "";
      const response = await fetch(`https://fakestoreapi.com/products${categoryQuery ? `/${categoryQuery}` : ""}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Propagate error for handling in the component
    }
  };
  