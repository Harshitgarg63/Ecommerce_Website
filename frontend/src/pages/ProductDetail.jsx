import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { fetchProductById } from "../api/productApi.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Reviews from "../components/Reviews.jsx";

const ProductDetail = ({ currentUser, isLoggedIn }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProductAndReviews = async () => {
    try {
      const fetchedProduct = await fetchProductById(id);
      setProduct(fetchedProduct);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductAndReviews();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
    navigate("/cart");
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-xl text-red-500">
        Product not found.
        <button
          onClick={() => navigate("/products")}
          className="mt-4 text-indigo-600 hover:underline flex items-center mx-auto"
        >
          <ChevronLeft size={18} /> Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-200">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-64 w-full object-cover md:w-64"
              src={
                product.image ||
                "https://placehold.co/400x300/f3f4f6/000000?text=Product+Image"
              }
              alt={product.name}
            />
          </div>
          <div className="p-8">
            <button
              onClick={() => navigate("/products")}
              className="text-gray-500 hover:text-indigo-600 transition-colors duration-200 flex items-center mb-4"
            >
              <ChevronLeft size={18} /> Back to Products
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              {product.name}
            </h2>
            <p className="text-indigo-600 text-2xl font-bold mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-lg font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-bold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {!loading && (
        <Reviews
          productId={id}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
};

export default ProductDetail;
