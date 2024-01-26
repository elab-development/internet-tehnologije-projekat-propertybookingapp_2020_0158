import React, { useState } from 'react';
import useProperties from '../Hooks/useProperties';
import Property from './Property';

import './Properties.css';
import Footer from '../Footer/Footer';
import NavBar from '../Navbar/Navbar';

const Properties = () => {

  const { properties, loading, error } = useProperties('http://127.0.0.1:8000/api/properties');
  const [filter, setFilter] = useState({ brojSoba: '', grad: '', tipNekretnine: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(3);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleReset = () => {
    setFilter({ brojSoba: '', grad: '', tipNekretnine: '' });
  };

  const filteredProperties = properties.filter(property => {
    const matchBrojSoba = filter.brojSoba === '' || property.brojSoba === parseInt(filter.brojSoba);
    const matchGrad = filter.grad === '' || property.grad.toLowerCase().includes(filter.grad.toLowerCase());
    const matchTipNekretnine = filter.tipNekretnine === '' || property.property_type.nazivTipa === filter.tipNekretnine;
    return matchBrojSoba && matchGrad && matchTipNekretnine;
  });

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <NavBar/>
    <div className="properties-container">
      <div className='properties-title'>
        <h2>Lista nekretnina koje nudimo:</h2>
      </div>
      <form className="filter-form">
        <label>
          Broj soba:
          <select
            className="filter-select"
            name="brojSoba"
            value={filter.brojSoba}
            onChange={handleInputChange}
          >
            <option value="">Izaberite broj soba</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>  
          </select>
        </label>
        <label>
          Grad:
          <input
            className="filter-input"
            type="text"
            name="grad"
            value={filter.grad}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Tip nekretnine:
          <select
            className="filter-select"
            name="tipNekretnine"
            value={filter.tipNekretnine}
            onChange={handleInputChange}
          >
            <option value="">Izaberite tip nekretnine</option>
            <option value="Stan">Stan</option>
            <option value="Kuca">Kuća</option>
            <option value="Vikendica">Vikendica</option>
            <option value="Salon">Salon</option>
            <option value="Poslovni prostor">Poslovni prostor</option>
            <option value="Plac">Plac</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Vila">Vila</option>
            <option value="Zemljiste">Zemljište</option>
          </select>
        </label>
        <button className="filter-button" type="button" onClick={handleReset}>
          Resetuj filtere
        </button>
      </form>
    <div className='properties-list'>
      {/* Properties */}
      {currentProperties.length > 0 ? (
        currentProperties.map((property) => (
          <Property key={property.id} property={property} />
        ))
      ) : (
        <p>Nema dostupnih nekretnina za zadate filtere.</p>
      )}
      </div>
  
      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button className="pagination-button" onClick={() => paginate(currentPage - 1)}>
            Nazad
          </button>
        )}
        {Array.from({ length: Math.ceil(filteredProperties.length / propertiesPerPage) }, (_, index) => (
          <button
            key={index}
            className="pagination-button"
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < Math.ceil(filteredProperties.length / propertiesPerPage) && (
          <button className="pagination-button" onClick={() => paginate(currentPage + 1)}>
            Napred
          </button>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Properties;