import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoModal from '../components/common/VideoModal';

/**
 * Componente de la página de inicio del sistema PQRSD
 * Página pública que presenta el sistema y permite acceso a funcionalidades básicas
 * 
 * @component
 * @returns {JSX.Element} Página de inicio con información del sistema y enlaces principales
 */
const HomePage = () => {
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    type: null
  });

  // Configuración de videos instructivos por tipo de PQRSD
  const videoConfig = {
    Peticion: {
      title: 'Cómo Registrar una Petición',
      description: 'Aprende paso a paso cómo registrar correctamente una petición en nuestro sistema PQRSD.',
      videoUrl: 'https://youtu.be/MAnLniUj63Y?t=127',
      steps: [
        'Completa todos los datos personales requeridos',
        'Selecciona "Petición" como tipo de PQRSD',
        'Describe detalladamente tu solicitud',
        'Adjunta documentos de respaldo si es necesario',
        'Revisa y envía tu petición'
      ],
      deadlines: {
        'Plazo de respuesta': '15 días hábiles',
        'Tiempo máximo': '30 días calendario'
      }
    },
    Queja: {
      title: 'Cómo Registrar una Queja',
      description: 'Guía completa para registrar una queja sobre la conducta o acción de servidores públicos.',
      videoUrl: 'https://youtu.be/MAnLniUj63Y?t=127',
      steps: [
        'Identifica claramente el servidor público involucrado',
        'Describe los hechos específicos de la queja',
        'Proporciona evidencia o testigos si los tienes',
        'Especifica qué solución esperas',
        'Adjunta documentos de respaldo'
      ],
      deadlines: {
        'Plazo de respuesta': '15 días hábiles',
        'Tiempo máximo': '30 días calendario'
      }
    },
    Reclamo: {
      title: 'Cómo Registrar un Reclamo',
      description: 'Instrucciones para registrar un reclamo sobre la prestación de servicios o trámites.',
      videoUrl: 'https://youtu.be/MAnLniUj63Y?t=127',
      steps: [
        'Identifica el servicio o trámite específico',
        'Describe el problema o inconformidad',
        'Menciona fechas y horarios relevantes',
        'Proporciona evidencia del problema',
        'Especifica la solución esperada'
      ],
      deadlines: {
        'Plazo de respuesta': '15 días hábiles',
        'Tiempo máximo': '30 días calendario'
      }
    },
    Sugerencia: {
      title: 'Cómo Registrar una Sugerencia',
      description: 'Aprende cómo presentar propuestas para mejorar el servicio o la gestión de la entidad.',
      videoUrl: 'https://youtu.be/MAnLniUj63Y?t=127',
      steps: [
        'Identifica el área o servicio a mejorar',
        'Describe tu propuesta de mejora',
        'Explica los beneficios esperados',
        'Proporciona ejemplos o casos de uso',
        'Adjunta material de respaldo si es necesario'
      ],
      deadlines: {
        'Plazo de respuesta': '15 días hábiles',
        'Tiempo máximo': '30 días calendario'
      }
    },
    Denuncia: {
      title: 'Cómo Registrar una Denuncia',
      description: 'Guía para registrar denuncias sobre irregularidades o conductas indebidas.',
      videoUrl: 'https://youtu.be/MAnLniUj63Y?t=127',
      steps: [
        'Identifica claramente los hechos denunciados',
        'Proporciona evidencia documental',
        'Menciona fechas, lugares y personas involucradas',
        'Describe el impacto de los hechos',
        'Mantén la confidencialidad de tu denuncia'
      ],
      deadlines: {
        'Plazo de respuesta': '15 días hábiles',
        'Tiempo máximo': '30 días calendario'
      }
    }
  };

  const handleVideoModalOpen = (type) => {
    setVideoModal({
      isOpen: true,
      type
    });
  };

  const handleVideoModalClose = () => {
    setVideoModal({
      isOpen: false,
      type: null
    });
  };

  return (
    <div className="fade-in">
      {/* Hero Section - Sección principal de bienvenida */}
      <div className="hero-section text-white py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Sistema de Gestión PQRSD
              </h1>
              <p className="lead mb-4">
                Plataforma tecnológica para la gestión eficiente de Peticiones, 
                Quejas, Reclamos, Sugerencias y Denuncias en organizaciones 
                públicas y privadas.
              </p>
              <div className="d-flex gap-3">
                <Link to="/registro-pqrsd" className="btn btn-primary-yellow btn-lg text-white">
                  <i className="fas fa-plus-circle me-2"></i>
                  Registrar PQRSD
                </Link>
                <Link to="/seguimiento" className="btn btn-outline-light btn-lg">
                  <i className="fas fa-search me-2"></i>
                  Seguimiento
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tipos de PQRSD - Sección explicativa de los diferentes tipos */}
      <div className="container mb-5">
        <h2 className="text-center mb-5 text-primary-blue">
          Tipos de PQRSD que puedes registrar
        </h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div 
              className="card h-100 border-start border-4 border-primary-yellow cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => handleVideoModalOpen('Peticion')}
            >
              <div className="card-body">
                <h6 className="card-title text-primary-blue">
                  <i className="fas fa-file-alt me-2"></i>
                  Petición
                </h6>
                <p className="card-text small">
                  Solicitudes de información, documentos o conceptos sobre 
                  temas de interés general.
                </p>
                <small className="text-muted">
                  <strong>Plazo:</strong> 15 días hábiles
                </small>
                <div className="mt-2">
                  <small className="text-primary-yellow">
                    <i className="fas fa-play-circle me-1"></i>
                    Ver video instructivo
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div 
              className="card h-100 border-start border-4 border-warning cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => handleVideoModalOpen('Queja')}
            >
              <div className="card-body">
                <h6 className="card-title text-primary-blue">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Queja
                </h6>
                <p className="card-text small">
                  Manifestaciones de inconformidad por la conducta o acción 
                  de servidores públicos.
                </p>
                <small className="text-muted">
                  <strong>Plazo:</strong> 15 días hábiles
                </small>
                <div className="mt-2">
                  <small className="text-primary-yellow">
                    <i className="fas fa-play-circle me-1"></i>
                    Ver video instructivo
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div 
              className="card h-100 border-start border-4 border-info cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => handleVideoModalOpen('Reclamo')}
            >
              <div className="card-body">
                <h6 className="card-title text-primary-blue">
                  <i className="fas fa-hand-paper me-2"></i>
                  Reclamo
                </h6>
                <p className="card-text small">
                  Manifestaciones de inconformidad por la prestación de 
                  servicios o trámites.
                </p>
                <small className="text-muted">
                  <strong>Plazo:</strong> 15 días hábiles
                </small>
                <div className="mt-2">
                  <small className="text-primary-yellow">
                    <i className="fas fa-play-circle me-1"></i>
                    Ver video instructivo
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div 
              className="card h-100 border-start border-4 border-success cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => handleVideoModalOpen('Sugerencia')}
            >
              <div className="card-body">
                <h6 className="card-title text-primary-blue">
                  <i className="fas fa-lightbulb me-2"></i>
                  Sugerencia
                </h6>
                <p className="card-text small">
                  Propuestas para mejorar el servicio o la gestión de 
                  la entidad.
                </p>
                <small className="text-muted">
                  <strong>Plazo:</strong> 15 días hábiles
                </small>
                <div className="mt-2">
                  <small className="text-primary-yellow">
                    <i className="fas fa-play-circle me-1"></i>
                    Ver video instructivo
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Características principales - Sección de beneficios del sistema */}
      <div className="container mb-5">
        <h2 className="text-center mb-5 text-primary-blue">
          ¿Por qué elegir nuestro sistema?
        </h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <i className="fas fa-shield-alt icon-large mb-3"></i>
                <h5 className="card-title text-primary-blue">Seguro y Confiable</h5>
                <p className="card-text">
                  Cumple con la Ley 1581 de 2012 de protección de datos personales. 
                  Tu información está segura con nosotros.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <i className="fas fa-clock icon-large mb-3"></i>
                <h5 className="card-title text-primary-blue">Respuesta Rápida</h5>
                <p className="card-text">
                  Seguimiento en tiempo real de tus solicitudes con plazos 
                  establecidos según la normativa vigente.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <i className="fas fa-chart-line icon-large mb-3"></i>
                <h5 className="card-title text-primary-blue">Transparencia</h5>
                <p className="card-text">
                  Acceso completo al historial de tus PQRSD y estado actual 
                  de cada solicitud en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Sección de llamada a la acción */}
      <div className="bg-light py-5 mb-5">
        <div className="container text-center">
          <h3 className="text-primary-blue mb-4">
            ¿Listo para registrar tu PQRSD?
          </h3>
          <p className="lead mb-4">
            Es simple, rápido y seguro. Tu voz es importante para nosotros.
          </p>
          <Link to="/registro-pqrsd" className="btn btn-primary-yellow btn-lg text-white">
            <i className="fas fa-plus-circle me-2"></i>
            Comenzar Ahora
          </Link>
        </div>
      </div>

      {/* Información de contacto - Sección de soporte y contacto */}
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">
                  <i className="fas fa-headset me-2"></i>
                  Soporte Técnico
                </h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-primary-blue mb-3">Horarios de Atención</h6>
                    <p className="mb-2">
                      <i className="fas fa-clock me-2 text-primary-yellow"></i>
                      Lunes a Viernes: 8:00 AM - 6:00 PM
                    </p>
                    <p className="mb-2">
                      <i className="fas fa-phone me-2 text-primary-yellow"></i>
                      Teléfono: 322 725 9804
                    </p>
                    <p className="mb-0">
                      <i className="fas fa-envelope me-2 text-primary-yellow"></i>
                      Email: contacto@ideapro.com.co
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-primary-blue mb-3">Información Legal</h6>
                    <p className="mb-2">
                      <i className="fas fa-shield-alt me-2 text-primary-yellow"></i>
                      Ley 1581 de 2012 - Protección de Datos
                    </p>
                    <p className="mb-2">
                      <i className="fas fa-gavel me-2 text-primary-yellow"></i>
                      Ley 1755 de 2015 - Derecho de Petición
                    </p>
                    <p className="mb-0">
                      <i className="fas fa-building me-2 text-primary-yellow"></i>
                      Desarrollado por Equipo SANTOTO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Video Instructivo */}
      {videoModal.isOpen && videoModal.type && (
        <VideoModal
          isOpen={videoModal.isOpen}
          onClose={handleVideoModalClose}
          videoUrl={videoConfig[videoModal.type].videoUrl}
          title={videoConfig[videoModal.type].title}
          description={videoConfig[videoModal.type].description}
          steps={videoConfig[videoModal.type].steps}
          deadlines={videoConfig[videoModal.type].deadlines}
        />
      )}
    </div>
  );
};

export default HomePage; 