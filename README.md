# Dashboard de Finanzas - DELSUD

Dashboard financiero full-stack desarrollado con React, Node.js, Express y PostgreSQL para visualizar métricas de ventas y gastos.

## 🚀 Tecnologías

### Frontend
- **React** con TypeScript
- **Recharts** para visualización de datos
- **CSS** puro (sin librerías de estilos)
- **Axios** para comunicación con API
- **Vite** como bundler

### Backend
- **Node.js** con Express
- **PostgreSQL** con Sequelize ORM
- **TypeScript**
- **Swagger** para documentación API
- **CORS** habilitado

## 📁 Estructura del Proyecto

```
├── backend/
│   ├── src/
│   │   ├── config/         # Configuración de BD
│   │   ├── controllers/    # Controladores de API
│   │   ├── models/         # Modelos Sequelize
│   │   ├── routes/         # Rutas de API
│   │   ├── services/       # Lógica de negocio
│   │   ├── data/          # Archivos JSON y normalización
│   │   └── validation/     # Validaciones
│   └── swagger/           # Documentación API
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas principales
│   │   ├── services/      # Servicios API
│   │   ├── style/         # Estilos CSS
│   │   └── types/         # Tipos TypeScript
└── recursos/              # Recursos del proyecto
```

## ⚙️ Configuración

### Prerrequisitos
- Node.js v16+
- PostgreSQL
- npm o yarn

### 1. Clonar el repositorio
```bash
git hhttps://github.com/EduMMorenolp/Dashboard-de-Finanzas-PruebaTecnica-FullStack-.git
cd Dashboard-de-Finanzas-PruebaTecnica-FullStack-
```

### 2. Base de Datos

Crear una base de datos PostgreSQL llamada `finance_dashboard`

### 2. Configurar Backend
```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=finance_dashboard
PORT=3000
```

### 3. Configurar Frontend
```bash
cd frontend
npm install
```

Opcional - crear `.env` para configurar API URL:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🏃‍♂️ Ejecución

### Iniciar Backend
```bash
cd backend
npm run dev
```
Servidor: http://localhost:3000
Swagger: http://localhost:3000/api-docs

### Iniciar Frontend
```bash
cd frontend
npm run dev
```
Aplicación: http://localhost:5173

## 📊 Funcionalidades

### Dashboard Principal
- **Métricas financieras** en tiempo real
- **Gráfico de líneas** con datos de ventas
- **Filtros por período**: Diario, Semanal, Mensual, Anual
- **Resumen de valores** positivos y negativos
- **Diseño responsive** para móviles

### API REST
- **CRUD completo** para ventas y gastos
- **Endpoints de métricas** con filtros temporales
- **Carga de datos** desde archivos JSON
- **Normalización** de datos automática
- **Documentación Swagger** integrada

## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/metrics?period=month` | Métricas del dashboard |
| GET | `/api/chart?period=month` | Datos para gráficos |
| GET | `/api/sales` | Listar todas las ventas |
| POST | `/api/sales` | Crear nueva venta |
| GET | `/api/expenses` | Listar todos los gastos |
| POST | `/api/expenses` | Crear nuevo gasto |
| POST | `/api/load` | Cargar datos desde JSON |
| POST | `/api/normalize` | Normalizar archivos JSON |

### Períodos Disponibles
- `day` - Diario
- `week` - Semanal  
- `month` - Mensual
- `year` - Anual

## 🗄️ Base de Datos

### Modelos
- **Sales**: Ventas con montos en ARS/USD
- **Expenses**: Gastos con montos en ARS/USD

### Campos Principales
- `amount`: DECIMAL(10,2) para precisión financiera
- `currency`: Moneda (ARS/USD)
- `date`: Fecha de la transacción
- `description`: Descripción del movimiento

## 🔧 Scripts Disponibles

### Backend
```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Compilar TypeScript
npm start        # Producción
```

### Frontend
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## 🛡️ Seguridad

- Validación de entrada en todos los endpoints
- Sanitización de logs para prevenir inyección
- Manejo seguro de errores sin exposición de datos internos

## 📱 Responsive Design

- Sidebar colapsable en móviles
- Gráficos adaptables
- Interfaz optimizada para diferentes tamaños de pantalla

## 🎨 Diseño

Implementa el diseño proporcionado en Figma con:
- Paleta de colores corporativa
- Tipografía consistente
- Componentes reutilizables
- CSS modular por componente