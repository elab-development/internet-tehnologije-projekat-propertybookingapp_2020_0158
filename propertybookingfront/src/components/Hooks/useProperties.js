import { useState, useEffect } from 'react';
import axios from 'axios';

const useProperties = (url) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(url);
        setProperties(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProperties();

  }, [url]);

  return { properties, loading, error };
};

export default useProperties;