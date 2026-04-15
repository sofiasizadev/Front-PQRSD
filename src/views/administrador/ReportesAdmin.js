import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';

const ReportesAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error cargando reportes:', error);
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
                <i className="fas fa-chart-bar me-2"></i>
                Reportes y Estadísticas
              </h1>
              <p className="mb-0">Análisis y métricas del sistema PQRSD</p>
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
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-chart-line me-2"></i>
                  Volumen de PQRSD por Mes
                </h5>
              </div>
              <div className="card-body">
                <div className="text-center py-5">
                  <i className="fas fa-chart-line fa-3x text-muted mb-3"></i>
                  <h5>Gráfico de Volumen Mensual</h5>
                  <p className="text-muted">Aquí se mostraría el gráfico de PQRSD por mes</p>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-pie-chart me-2"></i>
                  Clasificación por Tipo
                </h5>
              </div>
              <div className="card-body">
                <div className="text-center py-5">
                  <i className="fas fa-pie-chart fa-3x text-muted mb-3"></i>
                  <h5>Distribución por Tipo de PQRSD</h5>
                  <p className="text-muted">Aquí se mostraría el gráfico de distribución por tipo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-download me-2"></i>
                  Generar Reportes
                </h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary-yellow">
                    <i className="fas fa-file-excel me-2"></i>
                    Reporte Mensual (Excel)
                  </button>
                  <button className="btn btn-primary-blue">
                    <i className="fas fa-file-pdf me-2"></i>
                    Reporte Anual (PDF)
                  </button>
                  <button className="btn btn-success">
                    <i className="fas fa-chart-bar me-2"></i>
                    Estadísticas Detalladas
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-info-circle me-2"></i>
                  Métricas Clave
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <h6>Total PQRSD</h6>
                  <h3 className="text-primary-blue">156</h3>
                </div>
                <div className="mb-3">
                  <h6>Eficiencia de Respuesta</h6>
                  <h3 className="text-success">85%</h3>
                </div>
                <div className="mb-3">
                  <h6>Tiempo Promedio</h6>
                  <h3 className="text-info">12 días</h3>
                </div>
                <div className="mb-0">
                  <h6>PQRSD Vencidas</h6>
                  <h3 className="text-danger">3</h3>
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

export default ReportesAdmin; 