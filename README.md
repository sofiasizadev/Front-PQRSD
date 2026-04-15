# Sistema de Gestión PQRSD - Frontend

## Roles del Sistema

### 1. Peticionario
- Persona externa que registra PQRSD
- Formulario público de registro
- Seguimiento de solicitudes

### 2. Administrador
- Recibe, clasifica y redirige PQRSD
- Dashboard de gestión
- Asignación a dependencias y funcionarios

### 3. Funcionario
- Responde PQRSD asignadas
- Solicita reclasificación cuando es necesario
- Gestión de casos asignados

## Tecnologías Utilizadas

- **React 18.2.0** - Framework principal
- **React Router DOM 6.3.0** - Navegación
- **Bootstrap 5.2.0** - Framework CSS
- **React Bootstrap 2.7.0** - Componentes UI
- **Font Awesome 4.7.0** - Iconografía

## Paleta de Colores (IdeaPro)

- **Amarillo Principal:** `#f39200`
- **Azul:** `#1e2b39`

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone [URL_DEL_REPOSITORIO]
cd PQRSD
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar en modo desarrollo:**
```bash
npm start
```

4. **Abrir en el navegador:**
```
http://localhost:3000
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes comunes
│   ├── peticionario/   # Componentes para Peticionario
│   ├── administrador/  # Componentes para Administrador
│   └── funcionario/    # Componentes para Funcionario
├── pages/              # Páginas principales
├── services/           # Servicios de API
├── utils/              # Utilidades y helpers
├── styles/             # Estilos CSS
└── assets/             # Recursos estáticos
```

## Funcionalidades por Rol

### Peticionario
- Registro de nueva PQRSD
- Adjuntar archivos
- Seguimiento de solicitudes
- Historial de PQRSD enviadas

### Administrador
- Dashboard con métricas
- Lista de PQRSD recibidas
- Clasificación y asignación
- Gestión de dependencias
- Alertas de vencimiento

### Funcionario
- Dashboard de tareas asignadas
- Respuesta a PQRSD
- Solicitud de reclasificación
- Historial de respuestas


## Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack
