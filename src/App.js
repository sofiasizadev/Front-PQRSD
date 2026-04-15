import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


/* Rutas */

// Componentes de navegación
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Páginas públicas (Peticionario)
import HomePage from './views/HomePage';
import RegistroPQRSD from './views/peticionario/RegistroPQRSD';
import SeguimientoPQRSD from './views/peticionario/SeguimientoPQRSD';

// Páginas de autenticación
import Login from './views/auth/Login';

// Páginas del Administrador
import DashboardAdmin from './views/administrador/DashboardAdmin';
import GestionPQRSD from './views/administrador/GestionPQRSD';
import AsignacionPQRSD from './views/administrador/AsignacionPQRSD';
import ReportesAdmin from './views/administrador/ReportesAdmin';

// Páginas del Funcionario
import DashboardFuncionario from './views/funcionario/DashboardFuncionario';
import PQRSDAsignadas from './views/funcionario/PQRSDAsignadas';
import ResponderPQRSD from './views/funcionario/ResponderPQRSD';

// Componente de protección de rutas
import ProtectedRoute from './components/common/ProtectedRoute';

/**
 * Componente principal de la aplicación PQRSD
 * Configura el enrutamiento y estructura general de la aplicación
 * 
 * @component
 * @returns {JSX.Element} Aplicación completa con navegación y rutas
 */
function App() {
  /**
   * Efecto para limpiar datos residuales del localStorage al cargar la aplicación
   */
  useEffect(() => {
    // Limpiar datos de sesión al iniciar la aplicación
    // Esto es una limpieza adicional por seguridad
    const clearSessionData = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
    };
    
    // Solo limpiar si no hay una sesión válida
    const token = localStorage.getItem('token');
    if (!token || !token.startsWith('mock-token-')) {
      clearSessionData();
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Barra de navegación principal */}
        <Navbar />
        
        {/* Contenido principal de la aplicación */}
        <main className="container-fluid py-4">
          <Routes>
            {/* Rutas públicas (Peticionario) - Accesibles sin autenticación */}
            <Route path="/" element={<HomePage />} />
            <Route path="/registro-pqrsd" element={<RegistroPQRSD />} />
            <Route path="/seguimiento" element={<SeguimientoPQRSD />} />
            
            {/* Ruta de autenticación */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas del Administrador - Requieren autenticación y rol de admin */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute role="admin">
                  <DashboardAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/gestion" 
              element={
                <ProtectedRoute role="admin">
                  <GestionPQRSD />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/asignacion" 
              element={
                <ProtectedRoute role="admin">
                  <AsignacionPQRSD />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/reportes" 
              element={
                <ProtectedRoute role="admin">
                  <ReportesAdmin />
                </ProtectedRoute>
              } 
            />
            
            {/* Rutas del Funcionario - Requieren autenticación y rol de funcionario */}
            <Route 
              path="/funcionario/dashboard" 
              element={
                <ProtectedRoute role="funcionario">
                  <DashboardFuncionario />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/funcionario/pqrsd-asignadas" 
              element={
                <ProtectedRoute role="funcionario">
                  <PQRSDAsignadas />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/funcionario/responder/:id" 
              element={
                <ProtectedRoute role="funcionario">
                  <ResponderPQRSD />
                </ProtectedRoute>
              } 
            />
            
            {/* Ruta 404 - Página no encontrada */}
            <Route path="*" element={<div className="text-center py-5">
              <h1 className="text-primary-blue">404 - Página no encontrada</h1>
              <p>La página que buscas no existe.</p>
            </div>} />
          </Routes>
        </main>
        
        {/* Pie de página */}
        <Footer />
      </div>
    </Router>
  );
}

export default App; 