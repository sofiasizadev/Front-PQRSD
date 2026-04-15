import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/common/AdminSidebar';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPQRSD: 0,
    pendientes: 0,
    enProceso: 0,
    resueltas: 0,
    vencidas: 0
  });

  const [recentPQRSD, setRecentPQRSD] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos de ejemplo para demostración
        const mockStats = {
          totalPQRSD: 156,
          pendientes: 23,
          enProceso: 45,
          resueltas: 85,
          vencidas: 3
        };

        const mockRecentPQRSD = [
          {
            id: 1,
            numeroRadicado: 'PQRSD-1703123456789',
            tipo: 'Petición',
            asunto: 'Solicitud de información sobre trámites municipales',
            peticionario: 'Juan Carlos Pérez',
            fecha: '2024-01-15',
            estado: 'Pendiente',
            prioridad: 'Alta'
          },
          {
            id: 2,
            numeroRadicado: 'PQRSD-1703123456790',
            tipo: 'Queja',
            asunto: 'Queja sobre servicio de recolección de basuras',
            peticionario: 'María Rodríguez',
            fecha: '2024-01-14',
            estado: 'En Proceso',
            prioridad: 'Media'
          },
          {
            id: 3,
            numeroRadicado: 'PQRSD-1703123456791',
            tipo: 'Reclamo',
            asunto: 'Reclamo por demora en trámite de licencia',
            peticionario: 'Carlos López',
            fecha: '2024-01-13',
            estado: 'Resuelta',
            prioridad: 'Baja'
          }
        ];

        const mockNotifications = [
          {
            id: 1,
            mensaje: 'Nueva PQRSD registrada - PQRSD-1703123456789',
            tipo: 'info',
            fecha: 'Hace 5 minutos'
          },
          {
            id: 2,
            mensaje: '3 PQRSD próximas a vencer en las próximas 24 horas',
            tipo: 'warning',
            fecha: 'Hace 1 hora'
          },
          {
            id: 3,
            mensaje: 'PQRSD-1703123456791 marcada como resuelta',
            tipo: 'success',
            fecha: 'Hace 2 horas'
          }
        ];
        
        setStats(mockStats);
        setRecentPQRSD(mockRecentPQRSD);
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
                Dashboard Administrativo
              </h1>
              <p className="mb-0">
                Bienvenido al panel de control del Sistema PQRSD
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <button
                className="btn btn-primary-yellow sidebar-toggle"
                type="button"
                onClick={() => setShowSidebar(!showSidebar)}
                aria-label="Abrir menú"
              >
                <i className="fas fa-bars"></i>
              </button>
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
              <div className="dashboard-stat">{stats.totalPQRSD}</div>
              <h6>Total PQRSD</h6>
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
                {stats.totalPQRSD > 0 ? Math.round((stats.resueltas / stats.totalPQRSD) * 100) : 0}%
              </div>
              <h6>Eficiencia</h6>
            </div>
          </div>
        </div>



        {/* Contenido principal */}
        <div className="row">
          {/* PQRSD Recientes */}
          <div className="col-lg-8 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="fas fa-list me-2"></i>
                  PQRSD Recientes
                </h5>
                <Link to="/admin/gestion" className="btn btn-sm btn-primary-yellow">
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
                        <th>Prioridad</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPQRSD.map((pqrsd) => (
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
                            <span className={`badge ${getPrioridadBadge(pqrsd.prioridad)}`}>
                              {pqrsd.prioridad}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button className="btn btn-outline-primary" title="Ver detalles">
                                <i className="fas fa-eye"></i>
                              </button>
                              <button className="btn btn-outline-success" title="Asignar">
                                <i className="fas fa-user-plus"></i>
                              </button>
                              <button className="btn btn-outline-warning" title="Editar">
                                <i className="fas fa-edit"></i>
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
                  <strong>3 PQRSD próximas a vencer</strong>
                  <br />
                  <small>Revisar antes de las próximas 24 horas</small>
                </div>
                <div className="alert alert-info mb-0">
                  <i className="fas fa-users me-2"></i>
                  <strong>5 funcionarios disponibles</strong>
                  <br />
                  <small>Para asignación de nuevas PQRSD</small>
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
                    <i className="fas fa-shield-alt icon-large mb-2"></i>
                    <h6>Sistema Seguro</h6>
                    <small className="text-muted">Protección de datos garantizada</small>
                  </div>
                  <div className="col-md-3 text-center">
                    <i className="fas fa-clock icon-large mb-2"></i>
                    <h6>Actualización en Tiempo Real</h6>
                    <small className="text-muted">Datos siempre actualizados</small>
                  </div>
                  <div className="col-md-3 text-center">
                    <i className="fas fa-headset icon-large mb-2"></i>
                    <h6>Soporte Técnico</h6>
                    <small className="text-muted">Asistencia: 320 123 4567</small>
                  </div>
                  <div className="col-md-3 text-center">
                    <i className="fas fa-gavel icon-large mb-2"></i>
                    <h6>Cumplimiento Normativo</h6>
                    <small className="text-muted">Ley 1581 de 2012</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar lateral derecho */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};

export default DashboardAdmin; 