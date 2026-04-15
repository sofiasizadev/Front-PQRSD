import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/common/AdminSidebar';

const AsignacionPQRSD = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [pqrsdPendientes, setPqrsdPendientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo
  const mockPQRSDPendientes = [
    {
      id: 1,
      numeroRadicado: 'PQRSD-1703123456789',
      tipo: 'Petición',
      asunto: 'Solicitud de información sobre trámites municipales',
      peticionario: 'Juan Carlos Pérez',
      fecha: '2024-01-15',
      prioridad: 'Alta',
      dependencia: 'Secretaría de Planeación'
    }
  ];

  const mockFuncionarios = [
    { id: 1, nombre: 'María González', dependencia: 'Secretaría de Planeación', disponible: true },
    { id: 2, nombre: 'Carlos Mendoza', dependencia: 'Secretaría de Gobierno', disponible: true },
    { id: 3, nombre: 'Ana Rodríguez', dependencia: 'Secretaría de Hacienda', disponible: false }
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPqrsdPendientes(mockPQRSDPendientes);
        setFuncionarios(mockFuncionarios);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="mb-2">
                <i className="fas fa-user-plus me-2"></i>
                Asignación de PQRSD
              </h1>
              <p className="mb-0">Asigne PQRSD pendientes a funcionarios disponibles</p>
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
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-list me-2"></i>
                  PQRSD Pendientes de Asignación
                </h5>
              </div>
              <div className="card-body">
                {pqrsdPendientes.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-check-circle fa-3x text-success mb-3"></i>
                    <h5>No hay PQRSD pendientes de asignación</h5>
                    <p className="text-muted">Todas las PQRSD han sido asignadas correctamente</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Radicado</th>
                          <th>Tipo</th>
                          <th>Asunto</th>
                          <th>Peticionario</th>
                          <th>Dependencia</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pqrsdPendientes.map((pqrsd) => (
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
                            <td>{pqrsd.asunto}</td>
                            <td>{pqrsd.peticionario}</td>
                            <td>{pqrsd.dependencia}</td>
                            <td>
                              <button className="btn btn-sm btn-primary-yellow">
                                <i className="fas fa-user-plus me-1"></i>
                                Asignar
                              </button>
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

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-users me-2"></i>
                  Funcionarios Disponibles
                </h5>
              </div>
              <div className="card-body">
                {funcionarios.map((funcionario) => (
                  <div key={funcionario.id} className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <strong>{funcionario.nombre}</strong>
                      <br />
                      <small className="text-muted">{funcionario.dependencia}</small>
                    </div>
                    <span className={`badge ${funcionario.disponible ? 'bg-success' : 'bg-secondary'}`}>
                      {funcionario.disponible ? 'Disponible' : 'Ocupado'}
                    </span>
                  </div>
                ))}
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

export default AsignacionPQRSD; 