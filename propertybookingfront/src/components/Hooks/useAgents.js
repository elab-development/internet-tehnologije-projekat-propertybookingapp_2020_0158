import { useState, useEffect } from 'react';
import axios from 'axios';

const useAgents = (url) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(url);
        setAgents(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAgents();

  }, [url]); //  dodajemo url kao dependency

  return { agents, loading, error };
};

export default useAgents;