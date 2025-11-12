import React from 'react';
import Auto from './Auto';

const Autos = ({ autos, onDelete, onEdit }) => {
  return (
    <div className="autos-container">
      <h2>Catálogo de Autos JRZM</h2>
      <div className="autos-grid">
        {autos.map(auto => (
          <Auto 
            key={auto.id} 
            auto={auto} 
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Autos;