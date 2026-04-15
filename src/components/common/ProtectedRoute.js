import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente de protección de rutas del sistema PQRSD
 * Verifica la autenticación del usuario y redirige según el rol y permisos
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si la autenticación es exitosa
 * @param {string} props.role - Rol requerido para acceder a la ruta ('admin' o 'funcionario')
 * @returns {JSX.Element} Componente protegido o redirección al login
 */
const ProtectedRoute = ({ children, role }) => {
  // Verificar si el usuario está autenticado
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifica un rol y no coincide, redirigir al dashboard correspondiente
  if (role && userRole !== role) {
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (userRole === 'funcionario') {
      return <Navigate to="/funcionario/dashboard" replace />;
    }
  }

  // Si todo está bien, mostrar el componente hijo
  return children;
};

export default ProtectedRoute; 
