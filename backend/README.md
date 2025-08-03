# Dashboard de Finanzas - Backend

API REST desarrollada con Node.js, Express, TypeScript y PostgreSQL. Proporciona endpoints para gestión de ventas, gastos y métricas financieras con documentación Swagger integrada.

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/              # Configuración de base de datos
│   │   ├── config.json      # Configuración Sequelize
│   │   └── database.ts      # Conexión a PostgreSQL
│   │
│   ├── controllers/         # Controladores HTTP
│   │   ├── expense.controller.ts    # CRUD gastos
│   │   ├── sale.controller.ts       # CRUD ventas
│   │   ├── metrics.controller.ts    # Métricas dashboard
│   │   └── load.controller.ts       # Carga de datos JSON
│   │
│   ├── data/                # Archivos JSON y normalización
│   │   ├── gastos.json              # Datos originales gastos
│   │   ├── ventas.json              # Datos originales ventas
│   │   ├── gastos_normalized.json   # Gastos normalizados
│   │   ├── ventas_normalized.json   # Ventas normalizadas
│   │   ├── loadData.ts              # Carga masiva de datos
│   │   └── normalizeData.ts         # Normalización de archivos
│   │
│   ├── models/              # Modelos Sequelize
│   │   ├── Expense.ts       # Modelo de gastos
│   │   └── Sale.ts          # Modelo de ventas
│   │
│   ├── routes/              # Rutas Express
│   │   ├── expense.routes.ts        # Rutas /api/expenses
│   │   ├── sale.routes.ts           # Rutas /api/sales
│   │   ├── metrics.routes.ts        # Rutas /api/metrics
│   │   └── load.routes.ts           # Rutas /api/load
│   │
│   ├── services/            # Lógica de negocio
│   │   ├── expense.service.ts       # Servicios gastos
│   │   ├── sale.service.ts          # Servicios ventas
│   │   └── metrics.service.ts       # Servicios métricas
│   │
│   ├── validation/          # Validaciones
│   │   └── validation.ts    # Esquemas de validación
│   │
│   └── index.ts             # Servidor Express
│
├── swagger/                 # Documentación API
│   └── v1/                  # Versión 1 de la API
│       ├── components/      # Esquemas reutilizables
│       ├── paths/           # Definición de endpoints
│       └── main.ts          # Configuración Swagger
│
├── .env                     # Variables de entorno
├── package.json             # Dependencias y scripts
└── tsconfig.json            # Configuración TypeScript
```

## 🚀 Instalación y Configuración

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar base de datos

Crear base de datos PostgreSQL:

```sql
CREATE DATABASE finance_dashboard;
```

### 3. Configurar variables de entorno

Crear archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=finance_dashboard
PORT=3000
```

### 4. Ejecutar el servidor

```bash
# Desarrollo con hot reload
npm run dev

# Producción
npm run build
npm start
```

## 📊 API Endpoints

### Métricas Dashboard

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/api/metrics` | Métricas generales | `?period=day\|week\|month\|year` |
| GET | `/api/chart` | Datos para gráficos | `?period=day\|week\|month\|year` |

### Gestión de Ventas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/sales` | Listar todas las ventas |
| GET | `/api/sales/:id` | Obtener venta por ID |
| POST | `/api/sales` | Crear nueva venta |
| PUT | `/api/sales/:id` | Actualizar venta |
| DELETE | `/api/sales/:id` | Eliminar venta |

### Gestión de Gastos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/expenses` | Listar todos los gastos |
| GET | `/api/expenses/:id` | Obtener gasto por ID |
| POST | `/api/expenses` | Crear nuevo gasto |
| PUT | `/api/expenses/:id` | Actualizar gasto |
| DELETE | `/api/expenses/:id` | Eliminar gasto |

### Carga de Datos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/load` | Cargar datos desde archivos JSON |
| POST | `/api/normalize` | Normalizar archivos JSON |

## 🗄️ Modelos de Base de Datos

### Sale (Ventas)

```typescript
{
  id: number;
  id_venta: string;
  currency: 'ARS' | 'USD';
  amount: number;       
  date: Date;
  description: string;
  client: string;
}
```

### Expense (Gastos)

```typescript
{
  id: number;
  id_gasto: string;
  currency: 'ARS' | 'USD';
  amount: number;        
  date: Date;
  description: string;
  category: string;
}
```

## 📈 Funcionalidades Principales

### Métricas por Período

- **Diario**: Agrupa datos por día
- **Semanal**: Agrupa datos por semana
- **Mensual**: Agrupa datos por mes
- **Anual**: Agrupa datos por año

### Procesamiento de Datos

```typescript
// Ejemplo de respuesta /api/metrics?period=month
{
  "sales": {
    "ARS": 2500000,
    "USD": 15000
  },
  "expenses": {
    "ARS": 800000,
    "USD": 5000
  },
  "profit": {
    "ARS": 1700000,
    "USD": 10000
  }
}
```

### Carga Masiva de Datos

```bash
# Cargar datos desde archivos JSON
POST /api/load
# Carga ventas.json y gastos.json a la base de datos

# Normalizar archivos JSON
POST /api/normalize
# Genera archivos *_normalized.json con formato consistente
```

## 🛡️ Validaciones y Seguridad

### Validación de Entrada

- **Montos**: Números positivos con 2 decimales
- **Monedas**: Solo 'ARS' o 'USD'
- **Fechas**: Formato ISO válido
- **Campos requeridos**: Validación obligatoria

### Manejo de Errores

```typescript
// Respuesta de error estándar
{
  "error": "Mensaje de error",
  "details": "Detalles específicos",
  "statusCode": 400
}
```

### Sanitización

- Logs sanitizados para prevenir inyección
- Validación de tipos TypeScript
- Manejo seguro de errores de base de datos

## 📚 Documentación Swagger

Accede a la documentación interactiva:

```
http://localhost:3000/api-docs
```

### Características Swagger

- **Esquemas completos**: Modelos de datos documentados
- **Ejemplos de uso**: Requests y responses
- **Pruebas interactivas**: Ejecutar endpoints desde la interfaz
- **Validaciones**: Esquemas de validación integrados

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo con nodemon
npm run build        # Compilar TypeScript
npm start            # Ejecutar versión compilada
```

### Error al cargar datos JSON

1. Verificar formato de archivos JSON
2. Comprobar que los archivos existan en `/src/data/`
3. Revisar logs para errores específicos

### Puerto en uso

```bash
# Cambiar puerto en .env
PORT=3001
```

## 📱 CORS y Frontend

CORS habilitado para desarrollo:

```typescript
// Configuración CORS
app.use(cors({
  origin: 'http://localhost:5173', // Frontend Vite
  credentials: true
}));
```

## 🔄 Flujo de Datos

1. **Carga inicial**: `POST /api/load` carga datos JSON
2. **Normalización**: `POST /api/normalize` estandariza formato
3. **Consultas**: Frontend consume `/api/metrics` y `/api/chart`
4. **Filtrado**: Parámetro `period` agrupa datos temporalmente
5. **Respuesta**: JSON estructurado para visualización