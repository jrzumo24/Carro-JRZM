import React, { useState, useEffect } from 'react';
import Autos from './Components/Autos';
import Filter from './Components/Filter';
import Formulario from './Components/Formulario';
import Notification from './Components/Notification';
import autosService from './Services/autos';

const App = () => {
  const [autos, setAutos] = useState([]);
  const [filteredAutos, setFilteredAutos] = useState([]);
  const [filters, setFilters] = useState({
    marca: '',
    modelo: '',
    año: '',
    precioMax: '',
    color: ''
  });
  const [autoToEdit, setAutoToEdit] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    autosService.getAll()
      .then(initialAutos => {
        setAutos(initialAutos);
        setFilteredAutos(initialAutos);
      })
      .catch(error => {
        showNotification('Error al cargar los autos', 'error');
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, autos]);

  const applyFilters = () => {
    let filtered = [...autos];

    if (filters.marca) {
      filtered = filtered.filter(auto => 
        auto.marca.toLowerCase().startsWith(filters.marca.toLowerCase())
      );
    }

    if (filters.modelo) {
      filtered = filtered.filter(auto => 
        auto.modelo.toLowerCase().startsWith(filters.modelo.toLowerCase())
      );
    }

    if (filters.año) {
      filtered = filtered.filter(auto => 
        auto.año.toString().includes(filters.año)
      );
    }

    if (filters.precioMax) {
      filtered = filtered.filter(auto => 
        auto.precio <= parseInt(filters.precioMax)
      );
    }

    if (filters.color) {
      filtered = filtered.filter(auto => 
        auto.color.toLowerCase().startsWith(filters.color.toLowerCase())
      );
    }

    setFilteredAutos(filtered);
  };

  const addAuto = (nuevoAuto) => {
    autosService.create(nuevoAuto)
      .then(returnedAuto => {
        setAutos(autos.concat(returnedAuto));
        showNotification('Auto agregado correctamente', 'success');
      })
      .catch(error => {
        showNotification('Error al agregar el auto', 'error');
      });
  };

  const updateAuto = (updatedAuto) => {
    autosService.update(autoToEdit.id, updatedAuto)
      .then(returnedAuto => {
        setAutos(autos.map(auto => auto.id === autoToEdit.id ? returnedAuto : auto));
        setAutoToEdit(null);
        showNotification('Auto actualizado correctamente', 'success');
      })
      .catch(error => {
        showNotification('Error al actualizar el auto', 'error');
      });
  };

  const deleteAuto = (id) => {
    autosService.remove(id)
      .then(() => {
        setAutos(autos.filter(auto => auto.id !== id));
        showNotification('Auto eliminado correctamente', 'success');
      })
      .catch(error => {
        showNotification('Error al eliminar el auto', 'error');
      });
  };

  const handleEdit = (auto) => {
    setAutoToEdit(auto);
  };

  const handleSubmit = (autoData) => {
    if (autoToEdit) {
      updateAuto(autoData);
    } else {
      addAuto(autoData);
    }
  };

  const handleCancelEdit = () => {
    setAutoToEdit(null);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 2000);
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Catálogo de Autos</h1>
      </header>
      
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={closeNotification}
      />
      
      <main className="app-main">
        <div className="sidebar">
          <Formulario 
            onSubmit={handleSubmit}
            autoToEdit={autoToEdit}
            onCancel={handleCancelEdit}
          />
          <Filter 
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
        
        <div className="content">
          <Autos 
            autos={filteredAutos}
            onDelete={deleteAuto}
            onEdit={handleEdit}
          />
        </div>
      </main>
    </div>
  );
};

export default App;