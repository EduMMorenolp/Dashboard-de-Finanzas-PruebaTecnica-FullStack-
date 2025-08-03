# Dashboard de Finanzas - Frontend

Dashboard financiero desarrollado con React, TypeScript, Vite y CSS vanilla. Visualiza métricas de ventas y gastos con gráficos interactivos y diseño responsive.

## 📁 Estructura del Proyecto

```
📂 src/
├── components/
│   ├── Chart.tsx           # Gráfico de área con filtros temporales
│   ├── Header.tsx          # Encabezado con métricas
│   ├── Sidebar.tsx         # Navegación lateral
│   ├── ValueCard.tsx       # Tarjeta de valor destacado
│   └── ValueSummary.tsx    # Resumen de valores positivos/negativos
├── pages/
│   └── Dashboard.tsx       # Página principal del dashboard
├── services/
│   └── api.ts             # Servicios para comunicación con backend
├── style/
│   ├── variables.css      # Variables CSS globales
│   ├── Dashboard.css      # Estilos de la página principal
│   └── components/        # Estilos por componente
├── types/
│   └── api.ts            # Tipos TypeScript para API
└── App.tsx
```

## ✅ Características Implementadas

### **Tecnologías Utilizadas**

- ✅ **React**
- ✅ **TypeScript** para tipado fuerte
- ✅ **Vite** como build tool y bundler
- ✅ **CSS vanilla** con variables personalizadas
- ✅ **Recharts** para gráficos de área interactivos
- ✅ **Axios** para comunicación con API REST

### **Componentes**

- ✅ **Sidebar**: Navegación lateral con logo y menú
- ✅ **Header**: Saludo personalizado y métricas en tiempo real
- ✅ **Chart**: Gráfico de área con gradiente azul y filtros (Diario/Semanal/Mensual/Anual)
- ✅ **ValueCard**: Tarjeta destacada con concepto de valor
- ✅ **ValueSummary**: Grid de valores positivos (verde) y negativos (rojo)

### **Funcionalidades**

- ✅ **Responsive Design**: Sidebar colapsable en móviles
- ✅ **Filtros temporales**: Cambio dinámico de período en gráficos
- ✅ **Integración API**: Conexión con backend PostgreSQL
- ✅ **Agrupación de datos**: Por año, mes, semana o día
- ✅ **Formateo inteligente**: Etiquetas adaptativas según período

## 🎨 Personalización

### Variables CSS

Todas las variables de diseño están centralizadas en `src/style/variables.css`:

```css
:root {
  --primary-blue: #1e40af;
  --spacing-xl: 20px;
  --font-size-lg: 18px;
  /* ... más variables */
}
```

### Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (http://localhost:5173)
npm run build    # Build para producción
npm run preview  # Preview del build de producción
```

## 🔗 Configuración de API

Crea un archivo `.env` (opcional) para configurar la URL del backend:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Por defecto, la aplicación se conecta a `http://localhost:3000/api`.