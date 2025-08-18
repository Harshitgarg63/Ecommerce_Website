// src/api/productApi.js
import axios from "axios";

// ✅ create axios instance with default config
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // backend base
  withCredentials: true, // always send cookies
});

// ✅ optional: attach token automatically from localStorage (if you store it)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- API FUNCTIONS ---------------- //

// Fetch all products
export const fetchProducts = async (searchQuery = "", sortOrder = "") => {
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (sortOrder) params.append("sort", sortOrder);

    const response = await axiosInstance.get(`/products?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

// Create a product (admin only)
export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/products", productData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, productData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error);
    throw error;
  }
};

// Add product to cart
export const addProductToCart = async (productId, quantity) => {
  try {
    const { data } = await axiosInstance.post("/cart", { productId, quantity });
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error);
    throw error;
  }
};
