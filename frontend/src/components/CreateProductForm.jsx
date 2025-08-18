import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productApi.js";
import { toast } from "react-toastify";

// Predefined categories
const categories = ["Electronics", "Clothing", "Books", "Furniture", "Other"];

const CreateProductForm = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "", // ✅ added stock
    category: categories[0],
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stock || // ✅ validate stock
      !formData.category
    ) {
      setError("Please fill in all required fields.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(error);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await createProduct(formData, currentUser.token);
      toast.success("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "", // ✅ reset stock after submit
        category: categories[0],
        image: "",
      });
      navigate("/admin/list");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to create product";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Create New Product</h3>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Price, Stock, Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-grow px-4 py-2 text-white font-semibold rounded-md shadow-md ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            }`}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/list")}
            className="flex-grow px-4 py-2 text-gray-700 font-semibold rounded-md shadow-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            Error: {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProductForm;
