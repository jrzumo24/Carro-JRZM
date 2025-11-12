import React from 'react';

const colorMap = {
  'blanco': '#FFFFFF',
  'negro': '#000000',
  'rojo': '#FF0000',
  'amarillo': '#FFFF00',
  'gris': '#808080',
  'azul': '#0000FF',
  'verde': '#008000',
  'naranja': '#FFA500',
  'morado': '#800080',
  'rosa': '#FFC0CB',
  'marron': '#8B4513',
  'plateado': '#C0C0C0',
  'dorado': '#FFD700'
};

const Auto = ({ auto, onDelete, onEdit }) => {
  const getColorHex = (colorName) => {
    const colorLower = colorName.toLowerCase();
    return colorMap[colorLower] || '#626b64ff'; 
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar el auto ${auto.marca} ${auto.modelo}?`)) {
      onDelete(auto.id);
    }
  };

  return (
    <div className="auto-card">
      <h3>{auto.marca} {auto.modelo}</h3>
      <p><strong>Año:</strong> {auto.año}</p>
      <p><strong>Precio:</strong> ${auto.precio.toLocaleString()}</p>
      <p>
        <strong>Color:</strong> 
        <span 
          className="color-indicator" 
          style={{backgroundColor: getColorHex(auto.color)}}
        ></span> 
        {auto.color}
      </p>
      <div className="auto-actions">
        <button onClick={handleDelete} className="delete-btn">Eliminar</button>
      </div>
    </div>
  );
};

export default Auto;