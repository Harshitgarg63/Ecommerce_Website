import React, { useState } from "react";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              isLoggedIn && user?.role === "admin" ? (
                <AdminDashboard currentUser={user} />
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
