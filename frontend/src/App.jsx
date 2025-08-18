import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartPage from "./pages/CartPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ReviewForm from "./pages/ReviewForm.jsx";
import ReviewList from "./pages/ReviewList.jsx";
import axios from "axios";
import CreateProductForm from "./components/CreateProductForm.jsx";
import ProductListAdmin from "./pages/ProductListAdmin.jsx";
import ProductUpdateForm from "./components/ProductUpdateForm.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/auth/me",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setUser(response.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setIsLoggedIn(true);
    navigate("/Home");
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const shouldShowHeaderFooter = isLoggedIn;

  if (loading) {
    return <div>Loading...</div>; // Simple loading state
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col font-sans antialiased">
      {shouldShowHeaderFooter && (
        <Header
          currentUser={user}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route
            path="/checkout"
            element={
              isLoggedIn ? (
                <CheckoutPage />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetail currentUser={user} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/products/:id/review"
            element={
              isLoggedIn ? (
                <ReviewForm currentUser={user} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              isLoggedIn && user?.role === "admin" ? (
                <AdminDashboard currentUser={user} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/admin/create"
            element={
              isLoggedIn && user?.role === "admin" ? (
                <CreateProductForm currentUser={user} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/admin/update/:id"
            element={
              isLoggedIn && user?.role === "admin" ? (
                <ProductUpdateForm currentUser={user} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/admin/list"
            element={
              isLoggedIn && user?.role === "admin" ? (
                <ProductListAdmin currentUser={user} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/* Redirect to login if not authenticated */}
          {!isLoggedIn && (
            <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
          )}
        </Routes>
      </main>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
};

export default App;
