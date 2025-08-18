import React from "react";
import { ShoppingCart, Home, Store, User, LogOut, LogIn } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const Header = ({ currentUser, isLoggedIn, onLogout }) => {
  const { cartItems = [] } = useCart() || {}; // ✅ use cart instead of cartItems
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
  };

  // Prevent reduce crash by ensuring fallback []
  const cartCount = (cartItems || []).reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/Home")}
        >
          E-com
        </h1>
        <nav className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/Home")}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
              >
                <Home size={18} /> Home
              </button>
              <button
                onClick={() => navigate("/products")}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
              >
                <Store size={18} /> Products
              </button>
              {currentUser?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
                >
                  <User size={18} /> Admin
                </button>
              )}
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
              >
                <LogIn size={18} /> Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
              >
                Sign Up
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
