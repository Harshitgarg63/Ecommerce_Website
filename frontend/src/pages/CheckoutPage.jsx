import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart(); // ✅ fixed
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const subtotal = (cartItems || []).reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  // ✅ Check login from cookie
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        toast.info("You need to login first!");
        navigate("/login");
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      totalAmount: subtotal,
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/v1/orders", orderData, {
        withCredentials: true,
      });

      toast.success("Order placed successfully!");
      clearCart(); // ✅ clear cart
      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg mt-6 border-t pt-4">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
