# E-Commerce Store - GoShop

An online shopping platform that allows users to browse and purchase products, view product details, manage their cart, and proceed to checkout. This app is built using **React** and **React-Bootstrap** for UI components, with a **Fake Store API** to fetch product data.

---

## Features

- **Product Browsing**: Users can view products by category or browse all available products.
- **Product Details**: Users can view detailed information about a product, including title, description, price, and image.
- **Cart Management**: Users can add products to the cart, view quantities, and remove items. If a user adds more than one of the same product, the quantity is tracked.
- **Checkout**: Users can proceed to checkout and view a summary of their order.
- **Responsive Design**: The app is responsive, providing a good user experience across devices, scaling well on all device screens.

---

## Technologies Used

- **React**: The front-end framework used to build the app.
- **React-Bootstrap**: A library for responsive design and styled components.
- **Fake Store API**: A free API that provides fake product data for this demo.
- **React Context API**: For managing the cart state across the app.

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:
- **Node.js** (with npm or yarn)
- **Git** (for version control)

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/e-commerce-store.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce-store
   ```
3. Install the required dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Usage

### Browsing Products

- On the homepage, you can view all available products.
- You can filter products by category using the sidebar filter.

### Adding to Cart

- Click the "Add to Cart" button on a product's card to add it to your shopping cart.
- You can view the cart by navigating to the **Cart** page.

### Viewing Product Details

- Clicking on any product will take you to the **Product Details** page, where you can see more detailed information about the product.
- You can also select a size or color for certain products (e.g., shirts) through dropdown menus.

### Managing Cart

- In the cart, you can see all added items along with their quantities.
- You can remove individual items or update quantities directly from the cart.

### Checkout

- On the checkout page, you can review your cart before proceeding to checkout.
- You can go back to the shopping page or complete your purchase (in this demo, checkout is just a button).

---

## Folder Structure

```
src/
│
├── components/            # Reusable components (e.g., Navbar, ProductCard, etc.)
├── context/               # Cart context (for managing cart state)
├── pages/                 # Different pages (e.g., Home, ProductDetails, Cart)
│
├── styles/                # Custom styles for components and pages
│   ├── Home.css
│   ├── CartPage.css
│   ├── ProductDetails.css
│
├── App.js                 # Main App component, routes, and layout
└── index.js               # Entry point for React application
```

---

## Future Enhancements

- **Authentication**: Add user authentication (e.g., login/signup) to manage user accounts and order history.
- **Payment Integration**: Integrate payment gateways (e.g., Stripe, PayPal) for actual checkout functionality.
- **Ratings & Reviews**: Allow users to rate and review products.
- **Search**: Implement a search bar to quickly find products by name or category.

---

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Let me know if you need any changes!
