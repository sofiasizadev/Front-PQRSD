import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/common/AdminSidebar';

const GestionPQRSD = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [pqrsdList, setPqrsdList] = useState([]);
  const [filteredPQRSD, setFilteredPQRSD] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    estado: '',
    tipo: '',
    dependencia: '',
    fechaDesde: '',
    fechaHasta: ''
  });

  // Datos de ejemplo para demostración
  const mockPQRSDList = [
    {
      id: 1,
      numeroRadicado: 'PQRSD-1703123456789',
      tipo: 'Petición',
      asunto: 'Solicitud de información sobre trámites municipales',
      peticionario: 'Juan Carlos Pérez',
      documento: 'CC 12345678',
      email: 'juan.perez@email.com',
      fecha: '2024-01-15',
      estado: 'Pendiente',
      prioridad: 'Alta',
      dependencia: 'Secretaría de Planeación',
      funcionarioAsignado: null,
      fechaLimite: '2024-01-30',
      diasRestantes: 12
    },
    {
      id: 2,
      numeroRadicado: 'PQRSD-1703123456790',
      tipo: 'Queja',
      asunto: 'Queja sobre servicio de recolección de basuras',
      peticionario: 'María Rodríguez',
      documento: 'CC 87654321',
      email: 'maria.rodriguez@email.com',
      fecha: '2024-01-14',
      estado: 'En Proceso',
      prioridad: 'Media',
      dependencia: 'Secretaría de Gobierno',
      funcionarioAsignado: 'Carlos Mendoza',
      fechaLimite: '2024-01-29',
      diasRestantes: 11
    },
    {
      id: 3,
      numeroRadicado: 'PQRSD-1703123456791',
      tipo: 'Reclamo',
      asunto: 'Reclamo por demora en trámite de licencia',
      peticionario: 'Carlos López',
      documento: 'CC 11223344',
      email: 'carlos.lopez@email.com',
      fecha: '2024-01-13',
      estado: 'Resuelta',
      prioridad: 'Baja',
      dependencia: 'Secretaría de Planeación',
      funcionarioAsignado: 'María González',
      fechaLimite: '2024-01-28',
      diasRestantes: 10
    }
  ];

  const estados = ['Pendiente', 'En Proceso', 'Resuelta', 'Vencida'];
  const tipos = ['Petición', 'Queja', 'Reclamo', 'Sugerencia', 'Denuncia'];
  const dependencias = [
    'Despacho Alcalde',
    'Secretaría de Planeación y Obras Públicas',
    'Secretaría de Gobierno',
    'Secretaría de Hacienda',
    'Secretaría de Cultura y Deporte'
  ];

  useEffect(() => {
    const loadPQRSDData = async () => {
      setIsLoading(true);
      try {
        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPqrsdList(mockPQRSDList);
        setFilteredPQRSD(mockPQRSDList);
      } catch (error) {
        console.error('Error cargando PQRSD:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPQRSDData();
  }, []);

  useEffect(() => {
    // Aplicar filtros
    let filtered = pqrsdList;

    if (filters.estado) {
      filtered = filtered.filter(pqrsd => pqrsd.estado === filters.estado);
    }

    if (filters.tipo) {
      filtered = filtered.filter(pqrsd => pqrsd.tipo === filters.tipo);
    }

    if (filters.dependencia) {
      filtered = filtered.filter(pqrsd => pqrsd.dependencia === filters.dependencia);
    }

    if (filters.fechaDesde) {
      filtered = filtered.filter(pqrsd => new Date(pqrsd.fecha) >= new Date(filters.fechaDesde));
    }

    if (filters.fechaHasta) {
      filtered = filtered.filter(pqrsd => new Date(pqrsd.fecha) <= new Date(filters.fechaHasta));
    }

    setFilteredPQRSD(filtered);
  }, [filters, pqrsdList]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      estado: '',
      tipo: '',
      dependencia: '',
      fechaDesde: '',
      fechaHasta: ''
    });
  };

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
      {/* Header */}
      <div className="bg-primary-blue text-white py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="mb-2">
                <i className="fas fa-tasks me-2"></i>
                Gestión de PQRSD
              </h1>
              <p className="mb-0">
                Administre y clasifique las Peticiones, Quejas, Reclamos, Sugerencias y Denuncias
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <button
                className="btn btn-primary-yellow sidebar-toggle me-2"
                type="button"
                onClick={() => setShowSidebar(!showSidebar)}
                aria-label="Abrir menú"
              >
                <i className="fas fa-bars"></i>
              </button>
              <Link to="/admin/asignacion" className="btn btn-primary-yellow">
                <i className="fas fa-user-plus me-2"></i>
                Asignar PQRSD
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Filtros */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="fas fa-filter me-2"></i>
              Filtros de Búsqueda
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-2 mb-3">
                <label htmlFor="estado" className="form-label">Estado</label>
                <select
                  className="form-select"
                  id="estado"
                  name="estado"
                  value={filters.estado}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="tipo" className="form-label">Tipo</label>
                <select
                  className="form-select"
                  id="tipo"
                  name="tipo"
                  value={filters.tipo}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  {tipos.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="dependencia" className="form-label">Dependencia</label>
                <select
                  className="form-select"
                  id="dependencia"
                  name="dependencia"
                  value={filters.dependencia}
                  onChange={handleFilterChange}
                >
                  <option value="">Todas</option>
                  {dependencias.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="fechaDesde" className="form-label">Desde</label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaDesde"
                  name="fechaDesde"
                  value={filters.fechaDesde}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="fechaHasta" className="form-label">Hasta</label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaHasta"
                  name="fechaHasta"
                  value={filters.fechaHasta}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-1 mb-3 d-flex align-items-end">
                <button
                  className="btn btn-outline-secondary"
                  onClick={clearFilters}
                  title="Limpiar filtros"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h4 className="text-primary-blue">{filteredPQRSD.length}</h4>
                <p className="mb-0">PQRSD Filtradas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h4 className="text-warning">
                  {filteredPQRSD.filter(p => p.estado === 'Pendiente').length}
                </h4>
                <p className="mb-0">Pendientes</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h4 className="text-info">
                  {filteredPQRSD.filter(p => p.estado === 'En Proceso').length}
                </h4>
                <p className="mb-0">En Proceso</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h4 className="text-success">
                  {filteredPQRSD.filter(p => p.estado === 'Resuelta').length}
                </h4>
                <p className="mb-0">Resueltas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de PQRSD */}
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="fas fa-list me-2"></i>
              Lista de PQRSD ({filteredPQRSD.length})
            </h5>
            <div>
              <button className="btn btn-sm btn-outline-primary me-2">
                <i className="fas fa-download me-1"></i>
                Exportar
              </button>
              <button className="btn btn-sm btn-outline-success">
                <i className="fas fa-print me-1"></i>
                Imprimir
              </button>
            </div>
          </div>
          <div className="card-body">
            {filteredPQRSD.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-search fa-3x text-muted mb-3"></i>
                <h5>No se encontraron PQRSD</h5>
                <p className="text-muted">Intente ajustar los filtros de búsqueda</p>
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
                      <th>Dependencia</th>
                      <th>Funcionario</th>
                      <th>Días Restantes</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPQRSD.map((pqrsd) => (
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
                          <span className={`badge ${getPrioridadBadge(pqrsd.prioridad)}`}>
                            {pqrsd.prioridad}
                          </span>
                        </td>
                        <td>
                          <div style={{ maxWidth: '250px' }}>
                            <div className="text-truncate" title={pqrsd.asunto}>
                              {pqrsd.asunto}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong>{pqrsd.peticionario}</strong>
                            <br />
                            <small className="text-muted">{pqrsd.documento}</small>
                            <br />
                            <small className="text-muted">{pqrsd.email}</small>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${getEstadoBadge(pqrsd.estado)}`}>
                            {pqrsd.estado}
                          </span>
                        </td>
                        <td>
                          <small>{pqrsd.dependencia}</small>
                        </td>
                        <td>
                          {pqrsd.funcionarioAsignado ? (
                            <span className="text-success">
                              <i className="fas fa-user-check me-1"></i>
                              {pqrsd.funcionarioAsignado}
                            </span>
                          ) : (
                            <span className="text-warning">
                              <i className="fas fa-user-times me-1"></i>
                              Sin asignar
                            </span>
                          )}
                        </td>
                        <td>
                          <span className={getDiasRestantesClass(pqrsd.diasRestantes)}>
                            <strong>{pqrsd.diasRestantes} días</strong>
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary" title="Ver detalles">
                              <i className="fas fa-eye"></i>
                            </button>
                            {!pqrsd.funcionarioAsignado && (
                              <Link 
                                to={`/admin/asignacion?id=${pqrsd.id}`}
                                className="btn btn-outline-success" 
                                title="Asignar"
                              >
                                <i className="fas fa-user-plus"></i>
                              </Link>
                            )}
                            <button className="btn btn-outline-warning" title="Editar">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-outline-info" title="Historial">
                              <i className="fas fa-history"></i>
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

        {/* Paginación */}
        {filteredPQRSD.length > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Navegación de páginas">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Anterior</a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">Siguiente</a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Sidebar lateral derecho */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};

export default GestionPQRSD; 