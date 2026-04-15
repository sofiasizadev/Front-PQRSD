import React, { useEffect } from 'react';

/**
 * Componente modal para mostrar videos instructivos de YouTube
 * @param {boolean} isOpen - Estado de apertura del modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {string} videoUrl - URL del video de YouTube
 * @param {string} title - Título del modal
 * @param {string} description - Descripción del contenido
 * @param {array} steps - Lista de pasos básicos
 * @param {object} deadlines - Información de plazos
 */
const VideoModal = ({ isOpen, onClose, videoUrl, title, description, steps, deadlines }) => {
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

  // Extraer el ID del video de YouTube de la URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
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
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-play-circle me-2"></i>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12 mb-4">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={getYouTubeEmbedUrl(videoUrl)}
                    title="Video Instructivo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              
              <div className="col-12 mb-4">
                <div className="alert alert-info">
                  <h6 className="alert-heading">
                    <i className="fas fa-info-circle me-2"></i>
                    Descripción
                  </h6>
                  <p className="mb-0">{description}</p>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <h6 className="text-primary-blue mb-3">
                  <i className="fas fa-list-ol me-2"></i>
                  Pasos Básicos
                </h6>
                <ol className="ps-3">
                  {steps.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ol>
              </div>

              <div className="col-md-6 mb-4">
                <h6 className="text-primary-blue mb-3">
                  <i className="fas fa-clock me-2"></i>
                  Plazos de Respuesta
                </h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <tbody>
                      {Object.entries(deadlines).map(([key, value]) => (
                        <tr key={key}>
                          <td className="fw-bold">{key}:</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-12">
                <div className="alert alert-warning">
                  <h6 className="alert-heading">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Importante
                  </h6>
                  <p className="mb-0">
                    Todos los campos marcados con <span className="text-danger">*</span> son obligatorios 
                    y deben completarse para que su solicitud sea procesada correctamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary-yellow"
              onClick={onClose}
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

export default VideoModal;
