# GoShop - E-Commerce Store

GoShop is an online shopping platform where users can browse and purchase products, view product details, manage their cart, and proceed to checkout. Built using **React**, **React-Bootstrap**, and **Fake Store API**, GoShop provides an easy-to-use and responsive platform to simulate a full shopping experience.

---

## Thought Process

When developing GoShop, my goal was to create a user-friendly, fully functional e-commerce platform that could mimic a real shopping experience. To achieve this, I focused on several key considerations:

1. **User Experience**: I wanted to build an intuitive and responsive interface that would provide users with a seamless browsing and shopping experience. This led to the decision to use **React-Bootstrap**, which offers pre-built, customizable components that help create a modern, mobile-friendly layout.

2. **State Management**: For managing the cart and maintaining global state, I opted to use the **React Context API**. This decision ensures that state is accessible across different parts of the app, avoiding the complexity of prop drilling and making the app scalable as features are added.

3. **Extensibility**: I kept the architecture modular, breaking down the app into reusable components like `ProductCard`, `Navbar`, and `Cart`, which allows easy addition of features (like user authentication or payment integration) in the future.

4. **Performance & Responsiveness**: I made sure to follow best practices in building a responsive, fast-loading application. By using **React-Bootstrap**, the app adjusts its layout based on screen size, ensuring that users have a smooth experience whether on desktop or mobile.

5. **Focus on the Core Features**: The core functionality was built around key features like product browsing, cart management, and checkout. I used the **Fake Store API** for the product data to quickly simulate a working e-commerce platform without having to implement a back-end.

---

## Features

- **Product Browsing**: View products by category or browse all available products.
- **Product Details**: View detailed product information, including title, description, price, and image.
- **Cart Management**: Add, remove, and manage quantities of products in the cart.
- **Checkout**: View a summary of your order and proceed to checkout (demo only).
- **Responsive Design**: Scalable UI that provides a good experience across devices.

---

## Technologies Used

- **React**: A popular front-end library used to build dynamic user interfaces.
- **React-Bootstrap**: A library for responsive design, leveraging Bootstrap's components and styles.
- **Fake Store API**: A free API providing fake product data for demo purposes.
- **React Context API**: Used for managing cart state globally across the application.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

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

3. Install dependencies:
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

- On the homepage, you can view all products or filter by category.

### Adding to Cart

- Click the "Add to Cart" button on a product to add it to the cart.
- You can view the cart by navigating to the **Cart** page.

### Viewing Product Details

- Clicking on a product takes you to the **Product Details** page where you can see more details.
- Some products allow you to choose size or color (e.g., shirts) through dropdown menus.

### Managing Cart

- In the cart, you can view product quantities, update quantities, or remove items.

### Checkout

- On the checkout page, you can review your cart before proceeding to checkout (currently, it’s a demo).

---

## Folder Structure

```
src/
│
├── components/            # Reusable components (e.g., Navbar, ProductCard, etc.)
├── context/               # Context for managing cart state globally
├── pages/                 # Different pages (e.g., Home, ProductDetails, Cart)
│
├── styles/                # Custom styles for the components and pages
│   ├── Home.css
│   ├── CartPage.css
│   ├── ProductDetails.css
│
├── App.js                 # Main App component, routing setup, and layout
└── index.js               # Entry point for the React application
```

---

## Best Practices and Design Decisions

### Project Structure

- **Components**: We’ve broken down the UI into reusable components, such as `ProductCard` and `Navbar`, for better maintainability and readability.
- **State Management**: Used the **React Context API** to manage global state (e.g., the cart) and avoid prop drilling.
- **Component Separation**: Pages and components are separated for clarity. Each page (e.g., `Home`, `CartPage`, `ProductDetails`) contains its own logic.
- **Responsive Design**: Implemented **React-Bootstrap** for a mobile-first approach, ensuring the layout scales smoothly across devices.

### TypeScript Considerations

While this project is implemented in plain JavaScript, for production-scale applications, it’s highly recommended to use **TypeScript** for better type safety. Consider the following changes when refactoring to TypeScript:
- Use `interface` or `type` for defining product objects and cart items.
- Implement types for the **React Context** state and actions.
- Ensure API responses are type-checked, especially when dealing with third-party data sources.

---

## Future Enhancements

- **User Authentication**: Add login/signup features to handle user accounts and order history.
- **Payment Integration**: Integrate payment gateways such as Stripe or PayPal to handle real transactions.
- **Ratings & Reviews**: Allow users to rate products and leave reviews.
- **Search Functionality**: Implement a search bar to help users find products more easily.