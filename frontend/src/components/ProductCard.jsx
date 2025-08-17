import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 h-10">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-extrabold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/products/${product._id}`)}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full font-semibold text-sm hover:bg-indigo-100 transition-colors duration-200"
            >
              View
            </button>
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold text-sm shadow-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
