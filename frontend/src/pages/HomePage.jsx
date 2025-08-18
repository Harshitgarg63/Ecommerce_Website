import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30", // example 1
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f", // example 2
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", // example 3
];

const HomePage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      {/* Image Slider */}
      <div className="relative w-full h-[70vh] overflow-hidden rounded-b-2xl shadow-xl">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="E-commerce banner"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-opacity-30"></div>
        {/* Slider Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center py-12 max-w-2xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 tracking-tight">
          Welcome to our E-com Store
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">
          Find the best products for all your needs — fashion, electronics, and
          more.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
        >
          Shop Now
        </button>
      </motion.div>
    </div>
  );
};

export default HomePage;
