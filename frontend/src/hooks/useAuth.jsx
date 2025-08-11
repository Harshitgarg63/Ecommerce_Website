// src/hooks/useAuth.js
import { useState, createContext, useContext, useEffect } from "react";
import { loginUser, registerUser } from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // A function to handle user login
  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      setUser(response.user); // Assuming the response has a user object
      // You would also store the token in a cookie or localStorage here
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // A function to handle user registration
  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      setUser(response.user); // Assuming the response has a user object
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // A function to handle user logout
  const logout = () => {
    setUser(null);
    // Remove token from storage
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
