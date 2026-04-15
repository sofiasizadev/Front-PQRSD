import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardFuncionario = () => {
  const [stats, setStats] = useState({
    totalAsignadas: 0,
    pendientes: 0,
    enProceso: 0,
    resueltas: 0,
    vencidas: 0
  });

  const [pqrsdAsignadas, setPqrsdAsignadas] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo para demostración
  const mockStats = {
    totalAsignadas: 12,
    pendientes: 3,
    enProceso: 6,
    resueltas: 2,
    vencidas: 1
  };

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
    },
    {
      id: 3,
      numeroRadicado: 'PQRSD-1703123456791',
      tipo: 'Reclamo',
      asunto: 'Reclamo por demora en trámite de licencia',
      peticionario: 'Carlos López',
      fecha: '2024-01-13',
      estado: 'Resuelta',
      prioridad: 'Baja',
      fechaLimite: '2024-01-28',
      diasRestantes: 10
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      mensaje: 'Nueva PQRSD asignada - PQRSD-1703123456789',
      tipo: 'info',
      fecha: 'Hace 10 minutos'
    },
    {
      id: 2,
      mensaje: 'PQRSD-1703123456791 marcada como resuelta',
      tipo: 'success',
      fecha: 'Hace 2 horas'
    },
    {
      id: 3,
      mensaje: '1 PQRSD próxima a vencer en las próximas 24 horas',
      tipo: 'warning',
      fecha: 'Hace 3 horas'
    }
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats(mockStats);
        setPqrsdAsignadas(mockPQRSDAsignadas);
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error cargando datos del dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
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

  const getPrioridadBadge = (prioridad) => {
    const prioridades = {
      'Alta': 'bg-danger',
      'Media': 'bg-warning',
      'Baja': 'bg-success'
    };
    return prioridades[prioridad] || 'bg-secondary';
  };

  const getNotificationIcon = (tipo) => {
    const iconos = {
      'info': 'fas fa-info-circle text-info',
      'warning': 'fas fa-exclamation-triangle text-warning',
      'success': 'fas fa-check-circle text-success',
      'danger': 'fas fa-times-circle text-danger'
    };
    return iconos[tipo] || 'fas fa-bell text-info';
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
      {/* Header del Dashboard */}
      <div className="bg-primary-blue text-white py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="mb-2">
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard Funcionario
              </h1>
              <p className="mb-0">
                Bienvenido al panel de gestión de PQRSD asignadas
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <Link to="/funcionario/pqrsd-asignadas" className="btn btn-primary-yellow">
                <i className="fas fa-list me-2"></i>
                Ver Todas las PQRSD
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Métricas principales */}
        <div className="row mb-4">
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="dashboard-card text-center">
              <i className="fas fa-clipboard-list icon-large mb-2"></i>
              <div className="dashboard-stat">{stats.totalAsignadas}</div>
              <h6>Total Asignadas</h6>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="dashboard-card text-center">
              <i className="fas fa-clock icon-large mb-2"></i>
              <div className="dashboard-stat">{stats.pendientes}</div>
              <h6>Pendientes</h6>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="dashboard-card text-center">
              <i className="fas fa-cogs icon-large mb-2"></i>
              <div className="dashboard-stat">{stats.enProceso}</div>
              <h6>En Proceso</h6>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="dashboard-card text-center">
              <i className="fas fa-check-circle icon-large mb-2"></i>
              <div className="dashboard-stat">{stats.resueltas}</div>
              <h6>Resueltas</h6>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="dashboard-card text-center">
              <i className="fas fa-exclamation-triangle icon-large mb-2"></i>
              <div className="dashboard-stat">{stats.vencidas}</div>
              <h6>Vencidas</h6>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="dashboard-card text-center">
              <i className="fas fa-percentage icon-large mb-2"></i>
              <div className="dashboard-stat">
                {stats.totalAsignadas > 0 ? Math.round((stats.resueltas / stats.totalAsignadas) * 100) : 0}%
              </div>
              <h6>Eficiencia</h6>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-bolt me-2"></i>
                  Acciones Rápidas
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 col-sm-6 mb-3">
                    <Link to="/funcionario/pqrsd-asignadas" className="btn btn-primary-blue w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                      <i className="fas fa-list mb-2" style={{ fontSize: '2rem' }}></i>
                      <span>Ver PQRSD Asignadas</span>
                    </Link>
                  </div>
                  <div className="col-md-3 col-sm-6 mb-3">
                    <button className="btn btn-primary-yellow w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                      <i className="fas fa-reply mb-2" style={{ fontSize: '2rem' }}></i>
                      <span>Responder PQRSD</span>
                    </button>
                  </div>
                  <div className="col-md-3 col-sm-6 mb-3">
                    <button className="btn btn-warning w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                      <i className="fas fa-exchange-alt mb-2" style={{ fontSize: '2rem' }}></i>
                      <span>Solicitar Reclasificación</span>
                    </button>
                  </div>
                  <div className="col-md-3 col-sm-6 mb-3">
                    <button className="btn btn-info w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                      <i className="fas fa-history mb-2" style={{ fontSize: '2rem' }}></i>
                      <span>Historial de Respuestas</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="row">
          {/* PQRSD Asignadas */}
          <div className="col-lg-8 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="fas fa-list me-2"></i>
                  PQRSD Asignadas
                </h5>
                <Link to="/funcionario/pqrsd-asignadas" className="btn btn-sm btn-primary-yellow">
                  Ver Todas
                </Link>
              </div>
              <div className="card-body">
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
                          </td>
                          <td>
                            <div style={{ maxWidth: '200px' }}>
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
              </div>
            </div>
          </div>

          {/* Notificaciones y alertas */}
          <div className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-bell me-2"></i>
                  Notificaciones Recientes
                </h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="list-group-item px-0">
                      <div className="d-flex align-items-start">
                        <i className={`${getNotificationIcon(notification.tipo)} mt-1 me-2`}></i>
                        <div className="flex-grow-1">
                          <p className="mb-1">{notification.mensaje}</p>
                          <small className="text-muted">{notification.fecha}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alertas importantes */}
            <div className="card mt-4">
              <div className="card-header">
                <h6 className="mb-0">
                  <i className="fas fa-exclamation-triangle me-2 text-warning"></i>
                  Alertas Importantes
                </h6>
              </div>
              <div className="card-body">
                <div className="alert alert-warning mb-2">
                  <i className="fas fa-clock me-2"></i>
                  <strong>1 PQRSD próxima a vencer</strong>
                  <br />
                  <small>Revisar antes de las próximas 24 horas</small>
                </div>
                <div className="alert alert-info mb-0">
                  <i className="fas fa-check-circle me-2"></i>
                  <strong>2 PQRSD resueltas este mes</strong>
                  <br />
                  <small>Mantenga el buen trabajo</small>
                </div>
              </div>
            </div>

            {/* Información de plazos */}
            <div className="card mt-4">
              <div className="card-header">
                <h6 className="mb-0">
                  <i className="fas fa-calendar me-2"></i>
                  Plazos de Respuesta
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <small className="text-muted">Peticiones de interés general</small>
                  <div className="fw-bold">15 días hábiles</div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Peticiones de documentos</small>
                  <div className="fw-bold">10 días hábiles</div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Quejas, reclamos y sugerencias</small>
                  <div className="fw-bold">15 días hábiles</div>
                </div>
                <div className="mb-0">
                  <small className="text-muted">Consultas</small>
                  <div className="fw-bold">30 días hábiles</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información del sistema */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-info-circle me-2"></i>
                  Información del Sistema
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 text-center">
                    <i className="fas fa-user-check icon-large mb-2"></i>
                    <h6>Funcionario Activo</h6>
                    <small className="text-muted">María González</small>
                  </div>
                  <div className="col-md-3 text-center">
                    <i className="fas fa-building icon-large mb-2"></i>
                    <h6>Dependencia</h6>
                    <small className="text-muted">Secretaría de Planeación</small>
                  </div>
                  <div className="col-md-3 text-center">
                    <i className="fas fa-clock icon-large mb-2"></i>
                    <h6>Última Actividad</h6>
                    <small className="text-muted">Hace 2 horas</small>
                  </div>
                  <div className="col-md-3 text-center">
                    <i className="fas fa-headset icon-large mb-2"></i>
                    <h6>Soporte Técnico</h6>
                    <small className="text-muted">320 123 4567</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFuncionario; 