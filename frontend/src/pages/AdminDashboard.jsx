import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const AdminDashboard = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

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
          onClick={() => {
            onLogout();
            navigate("/");
          }}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition-colors duration-200"
        >
          Logout
        </button>
      </div>

      <nav className="flex space-x-4 mb-8">
        <NavLink
          to="list"
          className={({ isActive }) =>
            isActive
              ? "px-4 py-2 bg-indigo-600 text-white rounded-md"
              : "px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          }
        >
          Product List
        </NavLink>

        <NavLink
          to="create"
          className={({ isActive }) =>
            isActive
              ? "px-4 py-2 bg-indigo-600 text-white rounded-md"
              : "px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          }
        >
          Create Product
        </NavLink>
      </nav>

      {/* Render nested routes here */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
