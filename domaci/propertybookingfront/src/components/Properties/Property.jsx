import React from 'react';
import './Property.css';

const Property = ({ property }) => {
  return (
    <div className="property-card">
      <h2>{property.adresa}</h2>
      <p>Grad: {property.grad}</p>
      <p>Cena: {property.cena}</p>
      <p>Kvadratura: {property.kvadratura}</p>
      <p>Broj soba: {property.brojSoba}</p>
      <p>Tip nekretnine: {property.property_type.nazivTipa}</p>
     
    </div>
  );
};

export default Property;