import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-20 bg-gray-100 rounded-2xl shadow-xl border border-gray-200"
    >
      <h2 className="text-5xl font-extrabold text-indigo-800 tracking-tight">
        Welcome to our E-com Store
      </h2>
      <p className="mt-4 text-xl text-gray-600">
        Find the best products for all your needs.
      </p>
      <button
        onClick={() => navigate("/products")}
        className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
      >
        Shop Now
      </button>
    </motion.div>
  );
};

export default HomePage;
