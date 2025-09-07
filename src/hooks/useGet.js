import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3030/";

export const useGet = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      setData(response.data);
    } catch (err) {
      console.error("Помилка завантаження:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, setData, isLoading, error };
};
