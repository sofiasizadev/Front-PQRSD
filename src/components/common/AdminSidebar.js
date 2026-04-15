import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Componente reutilizable para el menú de acciones del administrador
 * @param {boolean} showSidebar - Estado de apertura del sidebar
 * @param {function} setShowSidebar - Función para controlar el estado del sidebar
 */
const AdminSidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();

  // Cerrar sidebar cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSidebar && !event.target.closest('.sidebar') && !event.target.closest('.sidebar-toggle')) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSidebar, setShowSidebar]);

  const handleLogout = () => {
    setShowSidebar(false);
    // Limpiar datos de sesión
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    // Redirigir al login
    navigate('/login');
  };

  if (!showSidebar) return null;

  return (
    <>
      {/* Overlay para cerrar sidebar */}
      <div 
        className="sidebar-overlay" 
        onClick={() => setShowSidebar(false)}
      ></div>
      
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h5 className="mb-0">
            <i className="fas fa-bars me-2"></i>
            Menú de Acciones
          </h5>
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setShowSidebar(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="sidebar-body">
          <div className="sidebar-section">
            <h6 className="sidebar-section-title">
              <i className="fas fa-tachometer-alt me-2"></i>
              Gestión
            </h6>
            <Link to="/admin/gestion" className="sidebar-item" onClick={() => setShowSidebar(false)}>
              <i className="fas fa-clipboard-list me-2 text-primary-yellow"></i>
              Gestionar PQRSD
            </Link>
            <Link to="/admin/asignacion" className="sidebar-item" onClick={() => setShowSidebar(false)}>
              <i className="fas fa-user-plus me-2 text-primary-yellow"></i>
              Asignar PQRSD
            </Link>
          </div>

          <div className="sidebar-section">
            <h6 className="sidebar-section-title">
              <i className="fas fa-chart-line me-2"></i>
              Reportes
            </h6>
            <Link to="/admin/reportes" className="sidebar-item" onClick={() => setShowSidebar(false)}>
              <i className="fas fa-chart-bar me-2 text-success"></i>
              Ver Reportes
            </Link>
          </div>

          <div className="sidebar-section mt-auto">
            <div className="sidebar-divider"></div>
            <button 
              className="sidebar-item sidebar-item-danger" 
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
