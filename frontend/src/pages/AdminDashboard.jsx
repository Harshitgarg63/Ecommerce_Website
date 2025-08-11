import React, { useState } from "react";
import ProductListAdmin from "./ProductListAdmin.jsx";
import CreateProductForm from "../components/CreateProductForm.jsx";
import ProductUpdateForm from "../components/ProductUpdateForm.jsx";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ currentUser }) => {
  const [adminView, setAdminView] = useState("list");
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate();

  const navigateAdmin = (view, product = null) => {
    setAdminView(view);
    setProductToEdit(product);
  };

  const renderAdminView = () => {
    switch (adminView) {
      case "list":
        return (
          <ProductListAdmin
            navigate={navigateAdmin}
            currentUser={currentUser}
          />
        );
      case "create":
        return (
          <CreateProductForm
            navigate={navigateAdmin}
            currentUser={currentUser}
          />
        );
      case "update":
        return (
          <ProductUpdateForm
            product={productToEdit}
            navigate={navigateAdmin}
            currentUser={currentUser}
          />
        );
      default:
        return (
          <ProductListAdmin
            navigate={navigateAdmin}
            currentUser={currentUser}
          />
        );
    }
  };

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-500">Access Denied</h2>
        <p className="mt-4 text-lg text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold text-indigo-800">
          Admin Dashboard
        </h2>
        <button
          onClick={() => navigateAdmin("create")}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-200"
        >
          Create New Product
        </button>
      </div>
      {renderAdminView()}
    </div>
  );
};

export default AdminDashboard;
