import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResponderPQRSD = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pqrsd, setPqrsd] = useState(null);
  const [respuesta, setRespuesta] = useState('');
  const [archivos, setArchivos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo
  const mockPQRSD = {
    id: 1,
    numeroRadicado: 'PQRSD-1703123456789',
    tipo: 'Petición',
    asunto: 'Solicitud de información sobre trámites municipales',
    peticionario: 'Juan Carlos Pérez',
    documento: 'CC 12345678',
    email: 'juan.perez@email.com',
    fecha: '2024-01-15',
    estado: 'En Proceso',
    descripcion: 'Necesito información sobre los requisitos para obtener licencia de construcción en el municipio.',
    fechaLimite: '2024-01-30',
    diasRestantes: 12
  };

  useEffect(() => {
    const loadPQRSD = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPqrsd(mockPQRSD);
      } catch (error) {
        console.error('Error cargando PQRSD:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPQRSD();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Respuesta enviada exitosamente');
      navigate('/funcionario/pqrsd-asignadas');
    } catch (error) {
      alert('Error al enviar la respuesta');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setArchivos(prev => [...prev, ...files]);
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

  if (!pqrsd) {
    return (
      <div className="container text-center py-5">
        <h3>PQRSD no encontrada</h3>
        <p>La PQRSD que busca no existe o no está asignada a su usuario.</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="bg-primary-blue text-white py-4 mb-4">
        <div className="container">
          <h1 className="mb-2">
            <i className="fas fa-reply me-2"></i>
            Responder PQRSD
          </h1>
          <p className="mb-0">Proporcione una respuesta detallada a la PQRSD</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-edit me-2"></i>
                  Formulario de Respuesta
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="respuesta" className="form-label">
                      Respuesta Detallada *
                    </label>
                    <textarea
                      className="form-control"
                      id="respuesta"
                      rows="8"
                      value={respuesta}
                      onChange={(e) => setRespuesta(e.target.value)}
                      placeholder="Escriba aquí su respuesta detallada a la PQRSD..."
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="archivos" className="form-label">
                      Archivos Adjuntos
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="archivos"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    <div className="form-text">
                      Puede adjuntar documentos de respaldo (PDF, DOC, DOCX, JPG, PNG)
                    </div>
                  </div>

                  {archivos.length > 0 && (
                    <div className="mb-3">
                      <h6>Archivos seleccionados:</h6>
                      <div className="list-group">
                        {archivos.map((file, index) => (
                          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <i className="fas fa-file me-2"></i>
                              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </div>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => setArchivos(archivos.filter((_, i) => i !== index))}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/funcionario/pqrsd-asignadas')}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary-yellow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Enviar Respuesta
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-info-circle me-2"></i>
                  Información de la PQRSD
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <strong>Número de Radicado:</strong>
                  <p className="mb-0">{pqrsd.numeroRadicado}</p>
                </div>
                <div className="mb-3">
                  <strong>Tipo:</strong>
                  <p className="mb-0">{pqrsd.tipo}</p>
                </div>
                <div className="mb-3">
                  <strong>Asunto:</strong>
                  <p className="mb-0">{pqrsd.asunto}</p>
                </div>
                <div className="mb-3">
                  <strong>Peticionario:</strong>
                  <p className="mb-0">{pqrsd.peticionario}</p>
                  <small className="text-muted">{pqrsd.documento}</small>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong>
                  <p className="mb-0">{pqrsd.email}</p>
                </div>
                <div className="mb-3">
                  <strong>Fecha de Registro:</strong>
                  <p className="mb-0">{new Date(pqrsd.fecha).toLocaleDateString()}</p>
                </div>
                <div className="mb-3">
                  <strong>Fecha Límite:</strong>
                  <p className="mb-0">{new Date(pqrsd.fechaLimite).toLocaleDateString()}</p>
                </div>
                <div className="mb-3">
                  <strong>Días Restantes:</strong>
                  <p className={`mb-0 ${pqrsd.diasRestantes <= 2 ? 'text-danger' : pqrsd.diasRestantes <= 5 ? 'text-warning' : 'text-success'}`}>
                    <strong>{pqrsd.diasRestantes} días</strong>
                  </p>
                </div>
                <div className="mb-0">
                  <strong>Descripción Original:</strong>
                  <p className="mb-0 text-muted">{pqrsd.descripcion}</p>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-header">
                <h6 className="mb-0">
                  <i className="fas fa-lightbulb me-2"></i>
                  Consejos para una Buena Respuesta
                </h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="fas fa-check text-success me-2"></i>
                    Sea claro y conciso
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check text-success me-2"></i>
                    Incluya información específica
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check text-success me-2"></i>
                    Adjunte documentos de respaldo
                  </li>
                  <li className="mb-0">
                    <i className="fas fa-check text-success me-2"></i>
                    Responda dentro del plazo establecido
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponderPQRSD; 