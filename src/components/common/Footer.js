import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente de pie de página del sistema PQRSD
 * Muestra información de contacto, enlaces útiles y datos legales de la empresa
 * 
 * @component
 * @returns {JSX.Element} Pie de página con información de contacto y enlaces
 */
const Footer = () => {
  return (
    <footer className="bg-primary-blue text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Información de la empresa */}
          <div className="col-md-4 mb-3">
            <h5 className="text-primary-yellow mb-3">
              <i className="fas fa-clipboard-list me-2"></i>
              Sistema PQRSD
            </h5>
            <p className="mb-2">
              Solución tecnológica para la gestión eficiente de Peticiones, 
              Quejas, Reclamos, Sugerencias y Denuncias.
            </p>
            <p className="mb-0">
              <strong>Desarrollado por:</strong> Equipo SANTOTO
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-4 mb-3">
            <h6 className="text-primary-yellow mb-3">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">
                  <i className="fas fa-home me-1"></i>
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/registro-pqrsd" className="text-white text-decoration-none">
                  <i className="fas fa-plus-circle me-1"></i>
                  Registrar PQRSD
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/seguimiento" className="text-white text-decoration-none">
                  <i className="fas fa-search me-1"></i>
                  Seguimiento
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-white text-decoration-none">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Acceso Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div className="col-md-4 mb-3">
            <h6 className="text-primary-yellow mb-3">Contacto</h6>
            <div className="mb-2">
              <i className="fas fa-phone me-2 text-primary-yellow"></i>
              <span>322 725 9804</span>
            </div>
            <div className="mb-2">
              <i className="fas fa-envelope me-2 text-primary-yellow"></i>
              <span>contacto@ideapro.com.co</span>
            </div>
            <div className="mb-2">
              <i className="fas fa-clock me-2 text-primary-yellow"></i>
              <span>Lunes a Viernes, 8:00 a 18:00</span>
            </div>
            <div className="mb-2">
              <i className="fas fa-map-marker-alt me-2 text-primary-yellow"></i>
              <span>Tunja, Colombia</span>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-3" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Información legal y copyright */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 small">
              © 2024 IdeaPro SAS. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0 small">
              Cumple con la Ley 1581 de 2012 - Protección de Datos Personales
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 