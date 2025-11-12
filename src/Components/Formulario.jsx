import React, { useState, useEffect } from 'react';

const Formulario = ({ onSubmit, autoToEdit, onCancel }) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [precio, setPrecio] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (autoToEdit) {
      setMarca(autoToEdit.marca);
      setModelo(autoToEdit.modelo);
      setAño(autoToEdit.año);
      setPrecio(autoToEdit.precio);
      setColor(autoToEdit.color);
    } else {
      resetForm();
    }
  }, [autoToEdit]);

  const resetForm = () => {
    setMarca('');
    setModelo('');
    setAño('');
    setPrecio('');
    setColor('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevoAuto = {
      marca,
      modelo,
      año: parseInt(año),
      precio: parseInt(precio),
      color
    };

    onSubmit(nuevoAuto);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <div className="form-container">
      <h3>{autoToEdit ? 'Editar Auto' : 'Agregar Nuevo Auto'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Marca:</label>
          <input 
            type="text" 
            value={marca} 
            onChange={(e) => setMarca(e.target.value)} 
            required 
          />
        </div>
        <div className="form-field">
          <label>Modelo:</label>
          <input 
            type="text" 
            value={modelo} 
            onChange={(e) => setModelo(e.target.value)} 
            required 
          />
        </div>
        <div className="form-field">
          <label>Año:</label>
          <input 
            type="number" 
            value={año} 
            onChange={(e) => setAño(e.target.value)} 
            min="1900" 
            max="2030" 
            required 
          />
        </div>
        <div className="form-field">
          <label>Precio:</label>
          <input 
            type="number" 
            value={precio} 
            onChange={(e) => setPrecio(e.target.value)} 
            min="0" 
            required 
          />
        </div>
        <div className="form-field">
          <label>Color:</label>
          <input 
            type="text" 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
            required 
          />
        </div>
        <div className="form-actions">
          <button type="submit">{autoToEdit ? 'Actualizar' : 'Agregar'}</button>
          {autoToEdit && (
            <button type="button" onClick={handleCancel}>Cancelar</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Formulario;
