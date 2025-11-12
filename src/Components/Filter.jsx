import React from 'react';

const Filter = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="filter-container">
      <h3>Buscar Autos</h3>
      <div className="filter-form">
        <div className="filter-field">
          <label>Marca:</label>
          <input 
            type="text" 
            name="marca" 
            value={filters.marca} 
            onChange={handleChange}
            placeholder="Buscar"
          />
        </div>
        <div className="filter-field">
          <label>Modelo:</label>
          <input 
            type="text" 
            name="modelo" 
            value={filters.modelo} 
            onChange={handleChange}
            placeholder="Buscar"
          />
        </div>
        <div className="filter-field">
          <label>Año:</label>
          <input 
            type="number" 
            name="año" 
            value={filters.año} 
            onChange={handleChange}
            placeholder="Buscar"
          />
        </div>
        <div className="filter-field">
          <label>Precio máximo:</label>
          <input 
            type="number" 
            name="precioMax" 
            value={filters.precioMax} 
            onChange={handleChange}
            placeholder="Buscar"
          />
        </div>
        <div className="filter-field">
          <label>Color:</label>
          <input 
            type="text" 
            name="color" 
            value={filters.color} 
            onChange={handleChange}
            placeholder="Buscar"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;