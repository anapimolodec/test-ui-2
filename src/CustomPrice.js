import React, { useState, useEffect } from 'react';

const PriceComponent = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');

  useEffect(() => {
    const generateRandomId = () => {
      return Math.floor(Math.random() * 1000);
    };

    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch price');
        }
        const data = await response.json();
        console.log(data);
        setPrice(data.name);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();

    const intervalId = setInterval(() => {
      const newId = generateRandomId();
      setId(newId);
    }, 60000);

    // Cleanup interval
    return () => clearInterval(intervalId);
  }, [id]);

  return (
    <div>
        <h1> id: {id}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {price && <p>Pokemon name: {price}</p>}
    </div>
  );
};

export default PriceComponent;
