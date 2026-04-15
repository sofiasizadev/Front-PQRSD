import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Law1581Modal from '../../components/common/Law1581Modal';

const RegistroPQRSD = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Datos del peticionario
    nombre: '',
    apellido: '',
    tipoDocumento: 'CC',
    numeroDocumento: '',
    email: '',
    telefono: '',
    direccion: '',
    
    // Datos de la PQRSD
    tipoPQRSD: 'Peticion',
    asunto: '',
    descripcion: '',
    categoria: '',
    dependencia: '',
    
    // Medio de notificación
    medioNotificacion: [],
    emailConfirmacion: '',
    
    // Archivos adjuntos
    archivos: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [showLaw1581Modal, setShowLaw1581Modal] = useState(false);
  const [law1581Accepted, setLaw1581Accepted] = useState(false);
  const [fileErrors, setFileErrors] = useState([]);

  // Opciones para los selectores
  const tiposDocumento = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'TI', label: 'Tarjeta de Identidad' },
    { value: 'PP', label: 'Pasaporte' },
    { value: 'NIT', label: 'NIT' }
  ];

  const tiposPQRSD = [
    { value: 'Peticion', label: 'Petición' },
    { value: 'Queja', label: 'Queja' },
    { value: 'Reclamo', label: 'Reclamo' },
    { value: 'Sugerencia', label: 'Sugerencia' },
    { value: 'Denuncia', label: 'Denuncia' }
  ];

  const categorias = [
    { value: 'general', label: 'Interés General' },
    { value: 'documentos', label: 'Solicitud de Documentos' },
    { value: 'informacion', label: 'Solicitud de Información' },
    { value: 'servicios', label: 'Servicios Públicos' },
    { value: 'tramites', label: 'Trámites' },
    { value: 'otros', label: 'Otros' }
  ];

  const dependencias = [
    { value: 'alcaldia', label: 'Despacho Alcalde' },
    { value: 'planeacion', label: 'Secretaría de Planeación y Obras Públicas' },
    { value: 'gobierno', label: 'Secretaría de Gobierno' },
    { value: 'hacienda', label: 'Secretaría de Hacienda' },
    { value: 'cultura', label: 'Secretaría de Cultura y Deporte' }
  ];

  const mediosNotificacion = [
    { value: 'email', label: 'Correo Electrónico' },
    { value: 'correspondencia', label: 'Dirección de Correspondencia' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  // Extensiones de archivo permitidas
  const allowedExtensions = [
    // Imágenes
    '.jpg', '.jpeg', '.gif', '.tiff', '.bmp',
    // PDFs
    '.pdf',
    // Microsoft Office
    '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    // Audio
    '.mp3', '.ogg', '.wav', '.m4a',
    // Video
    '.mp4', '.wmv', '.ogv'
  ];

  const maxFileSize = 4 * 1024 * 1024; // 4MB
  const maxTotalSize = 10 * 1024 * 1024; // 10MB

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para validar archivos
  const validateFile = (file) => {
    const errors = [];
    
    // Validar extensión
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      errors.push(`El archivo "${file.name}" tiene una extensión no permitida.`);
    }
    
    // Validar tamaño
    if (file.size > maxFileSize) {
      errors.push(`El archivo "${file.name}" excede el tamaño máximo de 4MB.`);
    }
    
    return errors;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const errors = [];
    
    // Validar cada archivo
    files.forEach(file => {
      const fileErrors = validateFile(file);
      errors.push(...fileErrors);
    });
    
    // Validar tamaño total
    const currentTotalSize = formData.archivos.reduce((total, file) => total + file.size, 0);
    const newTotalSize = currentTotalSize + files.reduce((total, file) => total + file.size, 0);
    
    if (newTotalSize > maxTotalSize) {
      errors.push(`El tamaño total de archivos excede el límite de 10MB.`);
    }
    
    if (errors.length > 0) {
      setFileErrors(errors);
      return;
    }
    
    setFileErrors([]);
    setFormData(prev => ({
      ...prev,
      archivos: [...prev.archivos, ...files]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      archivos: prev.archivos.filter((_, i) => i !== index)
    }));
  };

  // Función para manejar selección de medio de notificación
  const handleNotificacionChange = (medio) => {
    setFormData(prev => {
      const currentMedios = prev.medioNotificacion;
      const newMedios = currentMedios.includes(medio)
        ? currentMedios.filter(m => m !== medio)
        : [...currentMedios, medio];
      
      return {
        ...prev,
        medioNotificacion: newMedios
      };
    });
  };

  // Función para manejar el modal de Ley 1581
  const handleLaw1581Accept = () => {
    setLaw1581Accepted(true);
  };

  // Mostrar modal de Ley 1581 al cargar la página
  useEffect(() => {
    setShowLaw1581Modal(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que estemos en el paso 3 (archivos adjuntos)
    if (step !== 3) {
      alert('Debe completar todos los pasos antes de enviar la PQRSD.');
      return;
    }
    
    // Validar que se haya aceptado la Ley 1581
    if (!law1581Accepted) {
      alert('Debe aceptar los términos de la Ley 1581 de 2012 para continuar.');
      setShowLaw1581Modal(true);
      return;
    }
    
    // Validar que se haya seleccionado al menos un medio de notificación
    if (formData.medioNotificacion.length === 0) {
      alert('Debe seleccionar al menos un medio de notificación.');
      return;
    }
    
    // Validar que si se selecciona email, se proporcione el email de confirmación
    if (formData.medioNotificacion.includes('email') && !formData.emailConfirmacion) {
      alert('Debe confirmar su correo electrónico si selecciona este medio de notificación.');
      return;
    }
    
    // Validar campos obligatorios
    if (!formData.nombre || !formData.apellido || !formData.numeroDocumento || 
        !formData.email || !formData.telefono || !formData.asunto || !formData.descripcion) {
      alert('Debe completar todos los campos obligatorios antes de enviar la PQRSD.');
      return;
    }
    
    // Confirmar envío
    const confirmarEnvio = window.confirm(
      '¿Está seguro de que desea enviar su PQRSD? Una vez enviada, no podrá ser modificada.'
    );
    
    if (!confirmarEnvio) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Simular envío de datos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generar número de radicado
      const numeroRadicado = 'PQRSD-' + Date.now();
      
      // Mostrar mensaje de éxito
      alert(`¡PQRSD registrada exitosamente!\nNúmero de radicado: ${numeroRadicado}`);
      
      // Redirigir al seguimiento
      navigate('/seguimiento');
    } catch (error) {
      alert('Error al registrar la PQRSD. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepIndicator = () => (
    <div className="row mb-4">
      <div className="col-12">
        <div className="progress" style={{ height: '4px' }}>
          <div 
            className="progress-bar" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <small className={step >= 1 ? 'text-primary-blue' : 'text-muted'}>
            <i className={`fas fa-user ${step >= 1 ? 'text-primary-yellow' : ''}`}></i> Datos Personales
          </small>
          <small className={step >= 2 ? 'text-primary-blue' : 'text-muted'}>
            <i className={`fas fa-file-alt ${step >= 2 ? 'text-primary-yellow' : ''}`}></i> Detalles PQRSD
          </small>
          <small className={step >= 3 ? 'text-primary-blue' : 'text-muted'}>
            <i className={`fas fa-paperclip ${step >= 3 ? 'text-primary-yellow' : ''}`}></i> Archivos
          </small>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="nombre" className="form-label">Nombre *</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="apellido" className="form-label">Apellido *</label>
        <input
          type="text"
          className="form-control"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-4 mb-3">
        <label htmlFor="tipoDocumento" className="form-label">Tipo de Documento *</label>
        <select
          className="form-select"
          id="tipoDocumento"
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleInputChange}
          required
        >
          {tiposDocumento.map(tipo => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-8 mb-3">
        <label htmlFor="numeroDocumento" className="form-label">Número de Documento *</label>
        <input
          type="text"
          className="form-control"
          id="numeroDocumento"
          name="numeroDocumento"
          value={formData.numeroDocumento}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="email" className="form-label">Correo Electrónico *</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="telefono" className="form-label">Teléfono *</label>
        <input
          type="tel"
          className="form-control"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="direccion" className="form-label">Dirección</label>
        <textarea
          className="form-control"
          id="direccion"
          name="direccion"
          rows="3"
          value={formData.direccion}
          onChange={handleInputChange}
        ></textarea>
      </div>
      
      {/* Medio de Notificación */}
      <div className="col-12 mb-3">
        <label className="form-label">¿Por qué medio desea ser notificado de su PQRSD? *</label>
        <div className="row">
          {mediosNotificacion.map(medio => (
            <div key={medio.value} className="col-md-4 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`medio-${medio.value}`}
                  checked={formData.medioNotificacion.includes(medio.value)}
                  onChange={() => handleNotificacionChange(medio.value)}
                />
                <label className="form-check-label" htmlFor={`medio-${medio.value}`}>
                  {medio.label}
                </label>
              </div>
            </div>
          ))}
        </div>
        <small className="text-muted">
          Debe seleccionar al menos una opción para recibir notificaciones sobre el estado de su PQRSD.
        </small>
      </div>
      
      {/* Confirmación de Email */}
      {formData.medioNotificacion.includes('email') && (
        <div className="col-12 mb-3">
          <label htmlFor="emailConfirmacion" className="form-label">Confirmar Correo Electrónico *</label>
          <input
            type="email"
            className="form-control"
            id="emailConfirmacion"
            name="emailConfirmacion"
            value={formData.emailConfirmacion}
            onChange={handleInputChange}
            placeholder="Confirme su correo electrónico"
            required
          />
          <div className="form-text">
            Debe confirmar su correo electrónico para recibir notificaciones por este medio.
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="tipoPQRSD" className="form-label">Tipo de PQRSD *</label>
        <select
          className="form-select"
          id="tipoPQRSD"
          name="tipoPQRSD"
          value={formData.tipoPQRSD}
          onChange={handleInputChange}
          required
        >
          {tiposPQRSD.map(tipo => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="categoria" className="form-label">Categoría *</label>
        <select
          className="form-select"
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="asunto" className="form-label">Asunto *</label>
        <input
          type="text"
          className="form-control"
          id="asunto"
          name="asunto"
          value={formData.asunto}
          onChange={handleInputChange}
          placeholder="Resumen breve de su solicitud"
          required
        />
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción Detallada *</label>
        <textarea
          className="form-control"
          id="descripcion"
          name="descripcion"
          rows="6"
          value={formData.descripcion}
          onChange={handleInputChange}
          placeholder="Describa detalladamente su solicitud, queja, reclamo, sugerencia o denuncia..."
          required
        ></textarea>
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="dependencia" className="form-label">Dependencia de Interés</label>
        <select
          className="form-select"
          id="dependencia"
          name="dependencia"
          value={formData.dependencia}
          onChange={handleInputChange}
        >
          <option value="">Seleccione una dependencia</option>
          {dependencias.map(dep => (
            <option key={dep.value} value={dep.value}>
              {dep.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="row">
      
      {/* Mensajes de error de archivos */}
      {fileErrors.length > 0 && (
        <div className="col-12 mb-3">
          <div className="alert alert-danger">
            <h6 className="alert-heading">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Errores en archivos:
            </h6>
            <ul className="mb-0">
              {fileErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <div className="col-12 mb-3">
        <label htmlFor="archivos" className="form-label">Archivos Adjuntos</label>
        <input
          type="file"
          className="form-control"
          id="archivos"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.tiff,.bmp,.xls,.xlsx,.ppt,.pptx,.mp3,.ogg,.wav,.m4a,.mp4,.wmv,.ogv"
          onChange={handleFileChange}
        />
        <div className="form-text">
          Formatos permitidos: Imágenes (JPG, GIF, TIFF, BMP), PDF, Microsoft Office (Word, Excel, PowerPoint), 
          Audio (MP3, OGG, WAV, M4A), Video (MP4, WMV, OGV). Máximo 4MB por archivo, 10MB en total.
        </div>
      </div>
      
      {/* Lista de archivos seleccionados */}
      {formData.archivos.length > 0 && (
        <div className="col-12 mb-3">
          <h6>Archivos seleccionados:</h6>
          <div className="list-group">
            {formData.archivos.map((file, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-file me-2"></i>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFile(index)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumen de la PQRSD */}
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h6 className="mb-0">
              <i className="fas fa-eye me-2"></i>
              Resumen de su PQRSD
            </h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Peticionario:</strong> {formData.nombre} {formData.apellido}</p>
                <p><strong>Documento:</strong> {formData.tipoDocumento} {formData.numeroDocumento}</p>
                <p><strong>Email:</strong> {formData.email}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Tipo:</strong> {tiposPQRSD.find(t => t.value === formData.tipoPQRSD)?.label}</p>
                <p><strong>Asunto:</strong> {formData.asunto}</p>
                <p><strong>Archivos:</strong> {formData.archivos.length} adjuntos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mensaje de instrucciones para el envío */}
      <div className="col-12 mt-4">
        <div className="alert alert-success">
          <h6 className="alert-heading">
            <i className="fas fa-check-circle me-2"></i>
            ¡Casi listo!
          </h6>
          <p className="mb-2">
            Revise cuidadosamente toda la información antes de enviar su PQRSD. 
            Una vez enviada, no podrá ser modificada.
          </p>
          <p className="mb-0">
            <strong>Para enviar:</strong> Haga clic en el botón "Enviar PQRSD" ubicado en la parte inferior derecha.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  <i className="fas fa-home"></i> Inicio
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Registro PQRSD
              </li>
            </ol>
          </nav>

          {/* Título */}
          <div className="text-center mb-4">
            <h2 className="text-primary-blue">
              <i className="fas fa-plus-circle me-2"></i>
              Registro de PQRSD
            </h2>
            <p className="text-muted">
              Complete el formulario para registrar su Petición, Queja, Reclamo, Sugerencia o Denuncia
            </p>
          </div>

          {/* Indicador de pasos */}
          {renderStepIndicator()}

          {/* Formulario */}
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Paso 1: Datos personales */}
                {step === 1 && (
                  <>
                    <h5 className="text-primary-blue mb-4">
                      <i className="fas fa-user me-2"></i>
                      Datos del Peticionario
                    </h5>
                    {renderStep1()}
                  </>
                )}

                {/* Paso 2: Detalles de la PQRSD */}
                {step === 2 && (
                  <>
                    <h5 className="text-primary-blue mb-4">
                      <i className="fas fa-file-alt me-2"></i>
                      Detalles de la PQRSD
                    </h5>
                    {renderStep2()}
                  </>
                )}

                {/* Paso 3: Archivos adjuntos */}
                {step === 3 && (
                  <>
                    <h5 className="text-primary-blue mb-4">
                      <i className="fas fa-paperclip me-2"></i>
                      Archivos Adjuntos
                    </h5>
                    {renderStep3()}
                  </>
                )}

                {/* Botones de navegación */}
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Anterior
                  </button>
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={nextStep}
                    >
                      Siguiente
                      <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary-yellow"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Enviar PQRSD
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-4">
            <div className="alert alert-warning">
              <h6 className="alert-heading">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Información Importante
              </h6>
              <ul className="mb-0">
                <li>Los campos marcados con * son obligatorios</li>
                <li>Su PQRSD será procesada según los plazos establecidos por la normativa vigente</li>
                <li>Recibirá un número de radicado para hacer seguimiento</li>
                <li>Sus datos personales están protegidos por la Ley 1581 de 2012</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Ley 1581 */}
      <Law1581Modal
        isOpen={showLaw1581Modal}
        onAccept={handleLaw1581Accept}
        onClose={() => setShowLaw1581Modal(false)}
      />
    </div>
  );
};

export default RegistroPQRSD; 