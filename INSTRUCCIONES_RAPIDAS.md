Instrucciones Rápidas - Sistema PQRSD


### 1. Instalar y Ejecutar
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
```

### 2. Acceder al Sistema
-    URL:    http://localhost:3000
-    Peticionario:    Acceso directo desde la página de inicio
-    Administrador:    admin@ideapro.com / admin123
-    Funcionario:    funcionario@ideapro.com / func123

## Funcionalidades Principales

### Para Peticionarios (Público)
- Registro PQRSD:    `/registro-pqrsd`
-  Seguimiento:    `/seguimiento`
-  Página de inicio:    `/`

### Para Administradores
-  Dashboard:    `/admin/dashboard`
-  Gestión PQRSD:    `/admin/gestion`
-  Asignación:    `/admin/asignacion`
-  Reportes:    `/admin/reportes`

### Para Funcionarios
-  Dashboard:    `/funcionario/dashboard`
-  PQRSD Asignadas:    `/funcionario/pqrsd-asignadas`
-  Responder PQRSD:    `/funcionario/responder/:id`

## Paleta de Colores

```css
Amarillo: #f39200
Azul: #1e2b39
```

## Estructura de Archivos Clave

```
src/
├── App.js                    # Componente principal
├── components/common/        # Componentes compartidos
├── pages/                   # Páginas por rol
│   ├── peticionario/        # Páginas públicas
│   ├── administrador/       # Páginas del admin
│   └── funcionario/         # Páginas del funcionario
└── styles/index.css         # Estilos principales
```

## Comandos Útiles

```bash
npm start          # Desarrollo
npm build          # Producción
npm test           # Pruebas
```

## 📱 Responsive Design
-     Desktop (1200px+)
-     Tablet (768px - 1199px)
-     Mobile (< 768px)

##  Para agregar

1.    Revisar funcionalidades    - Probar todos los roles
2.    Personalizar estilos    - Ajustar colores y branding
3.    Conectar API    - Integrar con backend
4.    Agregar validaciones    - Mejorar formularios
5.    Implementar reportes    - Gráficos y estadísticas
