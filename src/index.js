import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

/**
 * Punto de entrada principal de la aplicación PQRSD
 * Renderiza el componente App en el elemento root del DOM
 * 
 * @fileoverview Configuración inicial de React y renderizado de la aplicación
 */

// Limpieza inicial del localStorage para evitar datos residuales
const clearInvalidSessionData = () => {
  // Limpiar TODOS los datos de sesión al iniciar la aplicación
  // Esto asegura que no haya datos residuales de sesiones anteriores
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  
  // También limpiar cualquier otro dato que pueda estar causando problemas
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('user') || key.includes('auth') || key.includes('session'))) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

// Ejecutar limpieza antes de renderizar
clearInvalidSessionData();

// Obtener el elemento root del DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación en modo estricto para detectar problemas
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 
