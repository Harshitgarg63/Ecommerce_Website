# E-commerce Website

A full-stack e-commerce web application built to showcase a comprehensive understanding of modern web development using the **MERN stack**. This platform allows users to browse products, add items to a shopping cart, and complete secure purchases.

---

## ✨ Features

- **User Authentication:** Secure user registration and login, with JWT (JSON Web Token) based authentication.
- **Dashboard:** Provides a complete overview of the e-commerce store with key metrics.
- **Product Management:** Create, read, update, and delete products, including adding images and managing stock.
- **Order Management:** Track the status of orders from placement to delivery.
- **Product Reviews:** Users can leave ratings and reviews on products they have purchased.
- **Admin Panel:** A dedicated interface for managing products, users, and orders.

---

## 🚀 Tech Stack

This project is built using the **MERN** stack, a powerful and popular technology stack for building dynamic web applications.

- **Frontend:** React
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

---

## 📁 Project Structure

The project is split into a `backend` and `frontend` directory.

### Backend

```
/backend
|-- /config
|   |-- db.js               # Database connection
|
|-- /controllers
|   |-- authController.js   # Handles user auth logic
|   |-- productController.js# Handles product CRUD operations
|   |-- userController.js   # Handles user profile logic
|   |-- orderController.js  # Handles order management
|   |-- reviewController.js # Handles product reviews
|
|-- /models
|   |-- User.js             # Mongoose schema for users
|   |-- Product.js          # Mongoose schema for products
|   |-- Order.js            # Mongoose schema for orders
|   |-- Review.js           # Mongoose schema for reviews
|
|-- /routes
|   |-- auth.js             # API routes for authentication
|   |-- products.js         # API routes for products
|   |-- users.js            # API routes for user profiles
|   |-- orders.js           # API routes for orders
|
|-- /middleware
|   |-- auth.js             # JWT authentication middleware
|
|-- /utils
|   |-- errorHandler.js     # Custom error handling utility
|   |-- jwtToken.js         # JWT token creation and handling
|
|-- .env                    # Environment variables
|-- server.js               # Main server file
|-- package.json
```

### Frontend

```
/frontend
|-- /public
|-- /src
|   |-- /components         # Reusable React components
|   |-- /pages              # Individual page components (e.g., Home, Product, Cart)
|   |-- /assets             # Images, fonts, etc.
|   |-- App.js              # Main application component
|   |-- index.js            # Entry point for the app
|-- package.json
```

---

## 🛠️ Installation

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (local or cloud instance like MongoDB Atlas)

---

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   In the backend directory, create a `.env` file and add the following environment variables. Replace the placeholder values with your own:

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.yourmongodb.net/ecommerce?retryWrites=true&w=majority
   JWT_SECRET=your_secret_key_for_jwt
   ```

4. **Run the server:**
   ```bash
   npm start
   ```
   The server should now be running on [http://localhost:5000](http://localhost:5000).

---

### Frontend Setup

> _Note: This section assumes you have started building your React frontend._

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   The frontend should open in your browser at [http://localhost:3000](http://localhost:3000).

---

## 📜 API Endpoints

Here are some of the key backend API endpoints available:

- `POST /api/v1/auth/register` – Register a new user
- `POST /api/v1/auth/login` – Log in a user
- `GET /api/v1/products` – Get all products
- `GET /api/v1/products/:id` – Get a single product
- `POST /api/v1/products` – Create a new product (admin only)
- `GET /api/v1/users/profile` – Get the current user's profile
- `GET /api/v1/orders/myorders` – Get all orders for the current user

---

## 📬 License

This project is licensed under the MIT License.

---

## 🙌 Contributions

Feel free to fork this repository, open issues, or submit pull requests!

---

**Happy Shopping!**
