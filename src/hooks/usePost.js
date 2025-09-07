import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3002/";
export const usePost = async () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCont = async () => {
    setisLoading(true);
    try {
      const respons = await axios.get(`${BASE_URL}${endpoint}`);
      setData(respons.data);
    } catch (error) {
      console.warn("somesing went wrong", error);
      setError(error.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getCont();
  }, []);
  return { data, isLoading, error };
};
const payload = {
  title: "a aadadas",
  views: 123123,
};
const respons = await axios.post(`${BASE_URL}posts`, payload);
setValue((prevValue) => [...prevValue, respons.data]);
return { data, isLoading, error };
