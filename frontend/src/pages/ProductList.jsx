import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts } from "../api/productApi.js";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts(searchQuery, sortOrder);
      setProducts(fetchedProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchQuery, sortOrder]);

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  // Filter products by selected category
  const filteredProducts = categoryFilter
    ? products.filter((p) => p.category === categoryFilter)
    : products;
  if (loading) {
    return (
      <div className="text-center text-lg text-gray-500 animate-pulse py-10">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500 py-10">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
          >
            <option value="">Sort by</option>
            <option value="price-asc">💲 Price (Low → High)</option>
            <option value="price-desc">💲 Price (High → Low)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10 text-lg">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
