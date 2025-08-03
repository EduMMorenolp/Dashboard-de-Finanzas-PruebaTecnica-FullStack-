# Dashboard de Finanzas

## Requisitos Previos

- Node.js (v16 o superior)
- PostgreSQL
- npm o yarn

## Configuración

### 1. Base de Datos

Crear una base de datos PostgreSQL llamada `finance_dashboard`

### 2. Backend

```bash
cd backend
npm install
```

Configurar variables de entorno en `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=finance_dashboard
```

### 3. Frontend

```bash
cd frontend
npm install
```

## Ejecución

### Iniciar Backend

```bash
cd backend
npm run dev
```

El backend estará disponible en: http://localhost:3000

### Iniciar Frontend

```bash
cd frontend
npm run dev
```

El frontend estará disponible en: http://localhost:5173

## API Endpoints

- `POST /api/load` - Carga datos desde JSON
- `POST /api/normalize` - Normalizar datos JSON
- `GET /api/chart?period=month` - Datos del gráfico
- `GET /api/metrics?period=month` - Métricas del dashboard
- `GET /api-docs` - Documentación Swagger

## Períodos Disponibles

- `year` - Anual
- `month` - Mensual
- `week` - Semanal
- `day` - Diario
