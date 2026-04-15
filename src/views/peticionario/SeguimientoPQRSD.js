import React, { useState, useEffect } from 'react';

const SeguimientoPQRSD = () => {
  const [numeroRadicado, setNumeroRadicado] = useState('');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [pqrsdData, setPqrsdData] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Datos de ejemplo para demostración
  const mockPQRSD = {
    numeroRadicado: 'PQRSD-1703123456789',
    fechaRegistro: '2024-01-15',
    tipo: 'Petición',
    asunto: 'Solicitud de información sobre trámites municipales',
    estado: 'En Proceso',
    peticionario: 'Juan Carlos Pérez',
    documento: 'CC 12345678',
    email: 'juan.perez@email.com',
    telefono: '3001234567',
    descripcion: 'Necesito información sobre los requisitos para obtener licencia de construcción en el municipio.',
    dependencia: 'Secretaría de Planeación y Obras Públicas',
    funcionarioAsignado: 'María González',
    fechaAsignacion: '2024-01-16',
    fechaLimite: '2024-01-30',
    archivosAdjuntos: [
      { nombre: 'documento_soporte.pdf', tipo: 'PDF', tamaño: '2.5 MB' },
      { nombre: 'foto_evidencia.jpg', tipo: 'JPG', tamaño: '1.2 MB' }
    ],
    historial: [
      {
        fecha: '2024-01-15 14:30:00',
        accion: 'PQRSD registrada',
        descripcion: 'Se ha registrado exitosamente la PQRSD en el sistema'
      },
      {
        fecha: '2024-01-16 09:15:00',
        accion: 'Asignada a funcionario',
        descripcion: 'PQRSD asignada a María González de la Secretaría de Planeación'
      },
      {
        fecha: '2024-01-18 11:45:00',
        accion: 'En revisión',
        descripcion: 'El funcionario está revisando la documentación adjunta'
      }
    ],
    respuestas: []
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchPerformed(true);

    try {
      // Simular búsqueda en la base de datos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Para demostración, mostrar datos mock si coincide
      if (numeroRadicado === 'PQRSD-1703123456789' && email === 'juan.perez@email.com') {
        setPqrsdData(mockPQRSD);
      } else {
        setPqrsdData(null);
      }
    } catch (error) {
      alert('Error al buscar la PQRSD. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSearching(false);
    }
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

  const getEstadoIcon = (estado) => {
    const iconos = {
      'Pendiente': 'fas fa-clock',
      'En Proceso': 'fas fa-cogs',
      'Resuelta': 'fas fa-check-circle',
      'Vencida': 'fas fa-exclamation-triangle'
    };
    return iconos[estado] || 'fas fa-clock';
  };

  const calcularDiasRestantes = (fechaLimite) => {
    const hoy = new Date();
    const limite = new Date(fechaLimite);
    const diffTime = limite - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const diasRestantes = pqrsdData ? calcularDiasRestantes(pqrsdData.fechaLimite) : 0;

  return (
    <div className="container fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  <i className="fas fa-home"></i> Inicio
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Seguimiento PQRSD
              </li>
            </ol>
          </nav>

          {/* Título */}
          <div className="text-center mb-4">
            <h2 className="text-primary-blue">
              <i className="fas fa-search me-2"></i>
              Seguimiento de PQRSD
            </h2>
            <p className="text-muted">
              Consulte el estado de su Petición, Queja, Reclamo, Sugerencia o Denuncia
            </p>
          </div>

          {/* Formulario de búsqueda */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-search me-2"></i>
                Consultar PQRSD
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSearch}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="numeroRadicado" className="form-label">
                      Número de Radicado *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="numeroRadicado"
                      value={numeroRadicado}
                      onChange={(e) => setNumeroRadicado(e.target.value)}
                      placeholder="Ej: PQRSD-1703123456789"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email registrado en la PQRSD"
                      required
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary-yellow"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Buscando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search me-2"></i>
                        Consultar
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Resultados de búsqueda */}
          {searchPerformed && (
            <>
              {pqrsdData ? (
                <div className="fade-in">
                  {/* Información principal */}
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <i className="fas fa-file-alt me-2"></i>
                        Información de la PQRSD
                      </h5>
                      <span className={`badge ${getEstadoBadge(pqrsdData.estado)}`}>
                        <i className={`${getEstadoIcon(pqrsdData.estado)} me-1`}></i>
                        {pqrsdData.estado}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Número de Radicado:</strong> {pqrsdData.numeroRadicado}</p>
                          <p><strong>Fecha de Registro:</strong> {new Date(pqrsdData.fechaRegistro).toLocaleDateString()}</p>
                          <p><strong>Tipo:</strong> {pqrsdData.tipo}</p>
                          <p><strong>Asunto:</strong> {pqrsdData.asunto}</p>
                          <p><strong>Dependencia:</strong> {pqrsdData.dependencia}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Peticionario:</strong> {pqrsdData.peticionario}</p>
                          <p><strong>Documento:</strong> {pqrsdData.documento}</p>
                          <p><strong>Email:</strong> {pqrsdData.email}</p>
                          <p><strong>Teléfono:</strong> {pqrsdData.telefono}</p>
                          <p><strong>Funcionario Asignado:</strong> {pqrsdData.funcionarioAsignado}</p>
                        </div>
                      </div>
                      
                      {/* Descripción */}
                      <div className="mt-3">
                        <h6>Descripción:</h6>
                        <p className="text-muted">{pqrsdData.descripcion}</p>
                      </div>

                      {/* Fechas importantes */}
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <div className="text-center p-3 bg-light rounded">
                            <h6 className="text-primary-blue">Fecha Límite</h6>
                            <p className="mb-0">{new Date(pqrsdData.fechaLimite).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center p-3 bg-light rounded">
                            <h6 className="text-primary-blue">Días Restantes</h6>
                            <p className={`mb-0 ${diasRestantes < 3 ? 'text-danger' : diasRestantes < 7 ? 'text-warning' : 'text-success'}`}>
                              {diasRestantes} días
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center p-3 bg-light rounded">
                            <h6 className="text-primary-blue">Fecha de Asignación</h6>
                            <p className="mb-0">{new Date(pqrsdData.fechaAsignacion).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Archivos adjuntos */}
                  {pqrsdData.archivosAdjuntos.length > 0 && (
                    <div className="card mb-4">
                      <div className="card-header">
                        <h6 className="mb-0">
                          <i className="fas fa-paperclip me-2"></i>
                          Archivos Adjuntos
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="list-group">
                          {pqrsdData.archivosAdjuntos.map((archivo, index) => (
                            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <i className="fas fa-file me-2"></i>
                                {archivo.nombre}
                                <small className="text-muted ms-2">({archivo.tamaño})</small>
                              </div>
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="fas fa-download me-1"></i>
                                Descargar
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Historial de seguimiento */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h6 className="mb-0">
                        <i className="fas fa-history me-2"></i>
                        Historial de Seguimiento
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="timeline">
                        {pqrsdData.historial.map((item, index) => (
                          <div key={index} className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                              <div className="d-flex justify-content-between">
                                <h6 className="mb-1">{item.accion}</h6>
                                <small className="text-muted">
                                  {new Date(item.fecha).toLocaleString()}
                                </small>
                              </div>
                              <p className="mb-0 text-muted">{item.descripcion}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Respuestas */}
                  {pqrsdData.respuestas.length > 0 ? (
                    <div className="card">
                      <div className="card-header">
                        <h6 className="mb-0">
                          <i className="fas fa-reply me-2"></i>
                          Respuestas
                        </h6>
                      </div>
                      <div className="card-body">
                        {pqrsdData.respuestas.map((respuesta, index) => (
                          <div key={index} className="border-start border-3 border-primary-yellow ps-3 mb-3">
                            <div className="d-flex justify-content-between">
                              <strong>{respuesta.funcionario}</strong>
                              <small className="text-muted">
                                {new Date(respuesta.fecha).toLocaleString()}
                              </small>
                            </div>
                            <p className="mb-1">{respuesta.contenido}</p>
                            {respuesta.archivo && (
                              <small>
                                <i className="fas fa-paperclip me-1"></i>
                                <a href="#" className="text-decoration-none">
                                  {respuesta.archivo}
                                </a>
                              </small>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      <strong>Sin respuestas aún:</strong> Su PQRSD está siendo procesada. 
                      Recibirá una respuesta antes de la fecha límite establecida.
                    </div>
                  )}
                </div>
              ) : (
                <div className="alert alert-warning text-center">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  <strong>No se encontró la PQRSD</strong>
                  <br />
                  Verifique que el número de radicado y el correo electrónico sean correctos.
                </div>
              )}
            </>
          )}

          {/* Información adicional */}
          <div className="mt-4">
            <div className="alert alert-info">
              <h6 className="alert-heading">
                <i className="fas fa-info-circle me-2"></i>
                Información sobre el Seguimiento
              </h6>
              <ul className="mb-0">
                <li>Conserve el número de radicado para futuras consultas</li>
                <li>El sistema le notificará por email cuando haya actualizaciones</li>
                <li>Los plazos de respuesta están establecidos según la normativa vigente</li>
                <li>Para consultas adicionales, contacte al soporte técnico</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline {
          position: relative;
          padding-left: 30px;
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 20px;
        }
        
        .timeline-marker {
          position: absolute;
          left: -35px;
          top: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--color-primary-yellow);
          border: 2px solid var(--color-primary-blue);
        }
        
        .timeline-item:not(:last-child)::before {
          content: '';
          position: absolute;
          left: -29px;
          top: 17px;
          width: 2px;
          height: calc(100% + 10px);
          background-color: var(--color-primary-blue);
        }
      `}</style>
    </div>
  );
};

export default SeguimientoPQRSD; 