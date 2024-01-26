import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WelcomePage.css';
import Navbar from '../Navbar/Navbar';

const WelcomePage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data.slice(0, 15)); // Uzimamo samo prvih 15
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="welcome-page">
      <div className='welcome-text'>
      <h1>Dobrodošli na Property Booking</h1>
      <p>
        Property Booking je platforma koja vam omogućava da pronađete savršen smještaj za vaše putovanje. Bilo da tražite luksuzni hotel, udoban apartman ili rustičnu kućicu, mi imamo sve!
      </p>
      <h2>Informacije o zemljama za koje nudimo rezervisanje nekretnina:</h2>
      </div>
      <div className="country-list">
        <ul>
          {countries.map((country, index) => (
            <li key={index}>
              <h3>{country.name.common}</h3>
              <p><strong>Glavni grad:</strong> {country.capital}</p>
              <img src={country.flags.svg} alt={`Zastava ${country.name.common}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default WelcomePage;