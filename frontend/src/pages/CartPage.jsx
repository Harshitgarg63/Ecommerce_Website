import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-100 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-700">
          Your cart is empty.
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 border border-gray-200"
            >
              <img
                src={
                  item.image ||
                  "https://placehold.co/80x80/f3f4f6/000000?text=Product"
                }
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-indigo-600 font-bold">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item._id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="text-base font-bold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-full bg-red-50 hover:bg-red-100"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <span className="text-gray-600">Subtotal:</span>
            <span className="text-lg font-semibold">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Shipping:</span>
            <span className="text-lg font-semibold">Free</span>
          </div>
          <div className="flex justify-between items-center font-bold text-xl text-gray-900 pt-4 border-t-2 border-gray-200">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")} // ✅ Navigate instead of calling checkout
            className="w-full mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
