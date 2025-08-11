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
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group"
    >
      {/* Image with zoom effect */}
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        <h3
          className="text-lg font-bold text-gray-900 leading-tight mb-2 truncate"
          title={product.name}
        >
          {product.name}
        </h3>
        <p
          className="text-sm text-gray-500 line-clamp-2 h-10"
          title={product.description}
        >
          {product.description}
        </p>

        {/* Price + Actions */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-extrabold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex space-x-2">
            {/* Pass product via state + id in URL */}
            <button
              onClick={() =>
                navigate(`/products/${product.id}`, { state: { product } })
              }
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full font-semibold text-sm hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
            >
              View
            </button>
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold text-sm shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
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
