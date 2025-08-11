import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { fetchProductById } from "../api/productApi.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If product is passed via state, use it instantly
    if (location.state?.product) {
      setProduct(location.state.product);
      setLoading(false);
    } else {
      // Otherwise fetch from API
      const getProduct = async () => {
        try {
          const fetchedProduct = await fetchProductById(id);
          setProduct(fetchedProduct);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getProduct();
    }
  }, [id, location.state]);

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
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-200">
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
          <button
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            className="w-full px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
