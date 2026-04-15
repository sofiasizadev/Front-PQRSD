import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de página de login del sistema PQRSD
 * Permite a Administradores y Funcionarios autenticarse en el sistema
 * 
 * @component
 * @returns {JSX.Element} Formulario de login con validación y redirección
 */
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Datos de ejemplo para demostración
  const mockUsers = [
    {
      email: 'admin@ideapro.com',
      password: 'admin123',
      role: 'admin',
      name: 'Administrador Sistema',
      id: 1
    },
    {
      email: 'funcionario@ideapro.com',
      password: 'func123',
      role: 'funcionario',
      name: 'María González',
      id: 2
    }
  ];

  /**
   * Maneja los cambios en los campos del formulario
   * @param {Event} e - Evento del input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  /**
   * Maneja el envío del formulario de login
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simular validación de credenciales
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user = mockUsers.find(u => 
        u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Guardar datos de sesión
        localStorage.setItem('token', 'mock-token-' + Date.now());
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userId', user.id);

        // Redirigir según el rol
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'funcionario') {
          navigate('/funcionario/dashboard');
        }
      } else {
        setError('Credenciales incorrectas. Por favor, verifique su email y contraseña.');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid fade-in">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          {/* Logo y título */}
          <div className="text-center mb-4">
            <div className="mb-3">
              <i className="fas fa-clipboard-list icon-large" style={{ fontSize: '4rem' }}></i>
            </div>
            <h2 className="text-primary-blue">Sistema PQRSD</h2>
            <p className="text-muted">Acceso Administrativo</p>
          </div>

          {/* Formulario de login */}
          <div className="card shadow">
            <div className="card-header text-center">
              <h5 className="mb-0">
                <i className="fas fa-sign-in-alt me-2"></i>
                Iniciar Sesión
              </h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope me-2"></i>
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="admin@ideapro.com"
                    required
                  />
                </div>

                {/* Contraseña */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-lock me-2"></i>
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </div>

                {/* Mensaje de error */}
                {error && (
                  <div className="alert alert-danger mb-3">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Botón de envío */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-login btn-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Iniciando Sesión...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Iniciar Sesión
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Información de credenciales de prueba */}
          <div className="mt-4">
            <div className="card border-info">
              <div className="card-header bg-info text-white">
                <h6 className="mb-0">
                  <i className="fas fa-info-circle me-2"></i>
                  Credenciales de Prueba
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-primary-blue">Administrador</h6>
                    <p className="mb-1"><strong>Email:</strong> admin@ideapro.com</p>
                    <p className="mb-0"><strong>Contraseña:</strong> admin123</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-primary-blue">Funcionario</h6>
                    <p className="mb-1"><strong>Email:</strong> funcionario@ideapro.com</p>
                    <p className="mb-0"><strong>Contraseña:</strong> func123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enlaces adicionales */}
          <div className="text-center mt-4">
            <a href="/" className="text-decoration-none">
              <i className="fas fa-arrow-left me-2"></i>
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>

      {/* Información de seguridad */}
      <div className="position-fixed bottom-0 start-0 p-3" style={{ zIndex: 1000 }}>
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <i className="fas fa-shield-alt me-2"></i>
          <strong>Seguridad:</strong> Este sistema cumple con la Ley 1581 de 2012 de protección de datos personales.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
};

export default Login; 