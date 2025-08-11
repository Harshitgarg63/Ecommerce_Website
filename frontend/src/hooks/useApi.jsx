// src/hooks/useApi.js
import { useState, useEffect } from "react";

const useApi = (apiFunction, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction(...args);
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiFunction, ...args]); // Re-run effect if API function or its arguments change

  return { data, loading, error };
};

export default useApi;
