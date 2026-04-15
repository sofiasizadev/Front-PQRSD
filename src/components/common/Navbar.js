import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

/**
 * Componente de navegación principal del sistema PQRSD
 * Maneja la navegación dinámica según el rol del usuario y el estado de autenticación
 * 
 * @component
 * @returns {JSX.Element} Barra de navegación con menús específicos por rol
 */
const Navbar = () => {
  // Estados para manejar la autenticación y rol del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Efecto para verificar el estado de autenticación al cargar y cuando cambia la ubicación
   */
  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    
    // Validar que el token sea válido y no sea un valor residual
    const isValidToken = token && 
                        token !== 'null' && 
                        token !== 'undefined' && 
                        token.trim() !== '' && 
                        token.startsWith('mock-token-');
    
    const isValidRole = role && 
                       role !== 'null' && 
                       role !== 'undefined' && 
                       role.trim() !== '' && 
                       (role === 'admin' || role === 'funcionario');
    
    const isValidName = name && 
                       name !== 'null' && 
                       name !== 'undefined' && 
                       name.trim() !== '';
    
    if (isValidToken && isValidRole && isValidName) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserName(name);
    } else {
      // Limpiar datos inválidos del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      
      setIsAuthenticated(false);
      setUserRole(null);
      setUserName('');
    }
  }, [location]);



  /**
   * Determina si la ruta actual es pública (accesible sin autenticación)
   * @returns {boolean} True si es una ruta pública
   */
  const isPublicRoute = () => {
    return ['/', '/registro-pqrsd', '/seguimiento', '/login'].includes(location.pathname);
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        {/* Logo y marca */}
        <Link className="navbar-brand" to="/">
          <i className="fas fa-clipboard-list me-2"></i>
          Sistema PQRSD
        </Link>

        {/* Botón hamburguesa para móviles - Se muestra en pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Enlaces públicos - Solo se muestran cuando NO está autenticado */}
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-home me-1"></i>
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro-pqrsd">
                    <i className="fas fa-plus-circle me-1"></i>
                    Registrar PQRSD
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/seguimiento">
                    <i className="fas fa-search me-1"></i>
                    Seguimiento
                  </Link>
                </li>
              </>
            )}

            {/* Enlaces del Administrador - Solo se muestran si está autenticado como admin */}
            {isAuthenticated && userRole === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/dashboard">
                    <i className="fas fa-tachometer-alt me-1"></i>
                    Dashboard
                  </Link>
                </li>
              </>
            )}

            {/* Enlaces del Funcionario - Solo se muestran si está autenticado como funcionario */}
            {isAuthenticated && userRole === 'funcionario' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/funcionario/dashboard">
                    <i className="fas fa-tachometer-alt me-1"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/funcionario/pqrsd-asignadas">
                    <i className="fas fa-list me-1"></i>
                    PQRSD Asignadas
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Menú de usuario - Sección derecha del navbar */}
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item">
                <span className="nav-link">
                  <i className="fas fa-user-circle me-1"></i>
                  {userName}
                </span>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 