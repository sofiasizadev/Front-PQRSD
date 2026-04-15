import React, { useEffect } from 'react';

/**
 * Componente modal para mostrar el aviso sobre la Ley 1581 de 2012
 * @param {boolean} isOpen - Estado de apertura del modal
 * @param {function} onAccept - Función que se ejecuta al aceptar
 * @param {function} onClose - Función para cerrar el modal
 */
const Law1581Modal = ({ isOpen, onAccept, onClose }) => {
  // Manejar el estado del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      // Restaurar scroll del body
      document.body.style.overflow = '';
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Manejar la tecla Escape para cerrar el modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal fade show" 
      style={{ display: 'block' }} 
      tabIndex="-1" 
      role="dialog" 
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary-blue text-white">
            <h5 className="modal-title">
              <i className="fas fa-shield-alt me-2"></i>
              Seguro y Confiable
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-4">
              <i className="fas fa-shield-alt text-primary-yellow" style={{ fontSize: '3rem' }}></i>
            </div>
            
            <div className="alert alert-info">
              <h6 className="alert-heading">
                <i className="fas fa-info-circle me-2"></i>
                Protección de Datos Personales
              </h6>
              <p className="mb-0">
                Cumple con la <strong>Ley 1581 de 2012</strong> de protección de datos personales. 
                Tu información está segura con nosotros.
              </p>
            </div>

            <div className="row">
              <div className="col-12">
                <h6 className="text-primary-blue mb-3">
                  <i className="fas fa-check-circle me-2"></i>
                  ¿Qué significa esto para ti?
                </h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-lock text-success me-2"></i>
                    Tus datos personales están protegidos por ley
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-user-shield text-success me-2"></i>
                    Solo usamos tu información para procesar tu PQRSD
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-eye-slash text-success me-2"></i>
                    No compartimos tu información con terceros
                  </li>
                </ul>
              </div>
            </div>

            <div className="alert alert-warning">
              <h6 className="alert-heading">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Importante
              </h6>
              <p className="mb-0">
                Al continuar con el registro de tu PQRSD, confirmas que has leído y 
                aceptas el tratamiento de tus datos personales conforme a la Ley 1581 de 2012.
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary-yellow"
              onClick={handleAccept}
            >
              <i className="fas fa-check me-2"></i>
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Law1581Modal;
