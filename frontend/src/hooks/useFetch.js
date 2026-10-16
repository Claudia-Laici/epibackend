import { useState } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async (url, options = {}) => {
    setError("");

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Si è verificato un errore"
        );
      }

      setData(result);
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return {
    data,
    error,
    fetchData,
  };
};
