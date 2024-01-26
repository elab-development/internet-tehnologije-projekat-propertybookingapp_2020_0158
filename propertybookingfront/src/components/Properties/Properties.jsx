import React from 'react';
import useProperties from '../Hooks/useProperties';
import Property from './Property';

const Properties = () => {
  const { properties, loading, error } = useProperties('http://127.0.0.1:8000/api/properties');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Lista nekretnina koje nudimo:</h1>
      {properties && properties.length > 0 ? (
        properties.map(property => (
          <Property key={property.id} property={property} />
        ))
      ) : (
        <p>Nema dostupnih nekretnina.</p>
      )}
    </div>
  );
};

export default Properties;