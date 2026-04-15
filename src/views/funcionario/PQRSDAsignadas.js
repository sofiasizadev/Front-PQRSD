import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PQRSDAsignadas = () => {
  const [pqrsdAsignadas, setPqrsdAsignadas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo
  const mockPQRSDAsignadas = [
    {
      id: 1,
      numeroRadicado: 'PQRSD-1703123456789',
      tipo: 'Petición',
      asunto: 'Solicitud de información sobre trámites municipales',
      peticionario: 'Juan Carlos Pérez',
      fecha: '2024-01-15',
      estado: 'En Proceso',
      prioridad: 'Alta',
      fechaLimite: '2024-01-30',
      diasRestantes: 12
    },
    {
      id: 2,
      numeroRadicado: 'PQRSD-1703123456790',
      tipo: 'Queja',
      asunto: 'Queja sobre servicio de recolección de basuras',
      peticionario: 'María Rodríguez',
      fecha: '2024-01-14',
      estado: 'Pendiente',
      prioridad: 'Media',
      fechaLimite: '2024-01-29',
      diasRestantes: 11
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPqrsdAsignadas(mockPQRSDAsignadas);
      } catch (error) {
        console.error('Error cargando PQRSD asignadas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getEstadoBadge = (estado) => {
    const estados = {
      'Pendiente': 'status-pendiente',
      'En Proceso': 'status-en-proceso',
      'Resuelta': 'status-resuelta',
      'Vencida': 'status-vencida'
    };
    return estados[estado] || 'status-pendiente';
  };

  const getDiasRestantesClass = (dias) => {
    if (dias <= 2) return 'text-danger';
    if (dias <= 5) return 'text-warning';
    return 'text-success';
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="bg-primary-blue text-white py-4 mb-4">
        <div className="container">
          <h1 className="mb-2">
            <i className="fas fa-list me-2"></i>
            PQRSD Asignadas
          </h1>
          <p className="mb-0">Gestione las PQRSD que le han sido asignadas</p>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="fas fa-clipboard-list me-2"></i>
              Mis PQRSD Asignadas ({pqrsdAsignadas.length})
            </h5>
          </div>
          <div className="card-body">
            {pqrsdAsignadas.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5>No tiene PQRSD asignadas</h5>
                <p className="text-muted">Cuando le asignen PQRSD, aparecerán aquí</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Radicado</th>
                      <th>Tipo</th>
                      <th>Asunto</th>
                      <th>Peticionario</th>
                      <th>Estado</th>
                      <th>Días Restantes</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pqrsdAsignadas.map((pqrsd) => (
                      <tr key={pqrsd.id}>
                        <td>
                          <strong>{pqrsd.numeroRadicado}</strong>
                          <br />
                          <small className="text-muted">
                            {new Date(pqrsd.fecha).toLocaleDateString()}
                          </small>
                        </td>
                        <td>
                          <span className="badge bg-primary">{pqrsd.tipo}</span>
                          <br />
                          <span className="badge bg-danger">{pqrsd.prioridad}</span>
                        </td>
                        <td>
                          <div style={{ maxWidth: '250px' }}>
                            <div className="text-truncate" title={pqrsd.asunto}>
                              {pqrsd.asunto}
                            </div>
                          </div>
                        </td>
                        <td>{pqrsd.peticionario}</td>
                        <td>
                          <span className={`badge ${getEstadoBadge(pqrsd.estado)}`}>
                            {pqrsd.estado}
                          </span>
                        </td>
                        <td>
                          <span className={getDiasRestantesClass(pqrsd.diasRestantes)}>
                            <strong>{pqrsd.diasRestantes} días</strong>
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link 
                              to={`/funcionario/responder/${pqrsd.id}`}
                              className="btn btn-outline-primary" 
                              title="Responder"
                            >
                              <i className="fas fa-reply"></i>
                            </Link>
                            <button className="btn btn-outline-warning" title="Solicitar reclasificación">
                              <i className="fas fa-exchange-alt"></i>
                            </button>
                            <button className="btn btn-outline-info" title="Ver detalles">
                              <i className="fas fa-eye"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PQRSDAsignadas; 