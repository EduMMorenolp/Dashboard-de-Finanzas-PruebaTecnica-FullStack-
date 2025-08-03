```bash
📂 src/
├── components/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── ValueCard.tsx
│   ├── Chart.tsx
│   └── ValueSummary.tsx
├── pages/
│   └── Dashboard.tsx
├── styles/
│   ├── _variables.scss
│   ├── Dashboard.scss
│   └── components/
│       ├── Sidebar.scss
│       ├── Header.scss
│       ├── ValueCard.scss
│       ├── Chart.scss
│       └── ValueSummary.scss

```

# Dashboard Fullstack - React + TypeScript + Vite

Dashboard interactivo creado con React, TypeScript, Vite y CSS vanilla siguiendo las especificaciones del diseño de Figma.

## 📁 Estructura del Proyecto

```
📂 src/
├── components/
│   ├── Sidebar.tsx
│   ├── Sidebar.css
│   ├── Header.tsx
│   ├── Header.css
│   ├── ValueCard.tsx
│   ├── ValueCard.css
│   ├── Chart.tsx
│   ├── Chart.css
│   ├── ValueSummary.tsx
│   └── ValueSummary.css
├── pages/
│   └── Dashboard.tsx
├── styles/
│   ├── variables.css
│   └── Dashboard.css
└── App.tsx
```

## 🚀 Instalación y Configuración

### 1. Crear el proyecto con Vite

```bash
npm create vite@latest dashboard-app --template react-ts
cd dashboard-app
```

### 2. Instalar dependencias

```bash
npm install recharts
```

### 3. Configurar la estructura de archivos

Crear las carpetas y archivos según la estructura mostrada arriba.

### 4. Copiar el contenido de los archivos

Copia el contenido de cada archivo proporcionado a su ubicación correspondiente:

- **Variables CSS**: `src/styles/variables.css`
- **Componentes**:
  - `src/components/Sidebar.tsx` + `src/components/Sidebar.css`
  - `src/components/Header.tsx` + `src/components/Header.css`
  - `src/components/Chart.tsx` + `src/components/Chart.css`
  - `src/components/ValueCard.tsx` + `src/components/ValueCard.css`
  - `src/components/ValueSummary.tsx` + `src/components/ValueSummary.css`
- **Página principal**: `src/pages/Dashboard.tsx`
- **Estilos principales**: `src/styles/Dashboard.css`
- **App principal**: `src/App.tsx`
- **Configuración**: `package.json`, `vite.config.ts`, `tsconfig.json`

### 5. Ejecutar el proyecto

```bash
npm run dev
```

## ✅ Características Implementadas

### **Tecnologías Utilizadas**

- ✅ **React 18** con Hooks
- ✅ **TypeScript** para tipado fuerte
- ✅ **Vite** como build tool
- ✅ **CSS vanilla** (sin librerías como MUI, Tailwind, etc.)
- ✅ **Recharts** para visualización de gráficos
- ✅ **CSS Custom Properties** para variables

### **Componentes**

- ✅ **Sidebar**: Navegación lateral con items activos
- ✅ **Header**: Título de bienvenida y métricas
- ✅ **Chart**: Gráfico lineal interactivo con selector de período
- ✅ **ValueCard**: Tarjeta destacada con valor principal
- ✅ **ValueSummary**: Grid de valores positivos y negativos

### **Funcionalidades**

- ✅ **Responsive Design**: Adaptativo para desktop, tablet y mobile
- ✅ **Estado React**: Manejo de navegación y datos
- ✅ **Props TypeScript**: Componentes tipados
- ✅ **CSS Variables**: Sistema de design tokens
- ✅ **Animaciones**: Transiciones suaves y efectos hover
- ✅ **Accesibilidad**: Focus states y navegación por teclado

### **Diseño**

- ✅ **Fiel al mockup**: Colores, tipografía y layout exactos
- ✅ **Sidebar oscuro**: Navegación lateral con logo de empresa
- ✅ **Header claro**: Saludo personalizado y métricas destacadas
- ✅ **Gráfico interactivo**: Línea azul con puntos activos
- ✅ **Tarjeta azul**: Valor destacado con botón de acción
- ✅ **Grid de valores**: Positivos en verde, negativos en rojo

## 📊 Integración con Datos JSON

El dashboard está preparado para recibir datos desde archivos JSON:

```typescript
// En Dashboard.tsx líneas 52-63
useEffect(() => {
  const loadData = async () => {
    try {
      // Cargar datos de ventas
      const salesResponse = await fetch("/data/sales.json");
      const salesJson = await salesResponse.json();
      setChartData(salesJson);

      // Cargar métricas
      const metricsResponse = await fetch("/data/metrics.json");
      const metricsJson = await metricsResponse.json();
      setMetrics(metricsJson);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };
  loadData();
}, []);
```

### Estructura esperada de los JSON:

**`public/data/sales.json`**:

```json
[
  { "month": "Ene", "value": 580000 },
  { "month": "Feb", "value": 620000 }
]
```

**`public/data/metrics.json`**:

```json
[
  { "value": 12, "label": "Valor 1", "icon": "📊" },
  { "value": 10, "label": "Valor 2", "icon": "⏰" }
]
```

## 🎨 Personalización

### Variables CSS

Todas las variables de diseño están centralizadas en `src/styles/variables.css`:

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

## 🐛 Troubleshooting

### Error de importación de CSS

Si tienes problemas con las importaciones de CSS, asegúrate de que:

1. Los archivos CSS estén en las rutas correctas
2. Las importaciones en los componentes TypeScript sean correctas
3. El archivo `Dashboard.css` importe todos los componentes

### Recharts no se muestra

Verifica que:

1. `recharts` esté instalado: `npm install recharts`
2. Los datos tengan el formato correcto (array de objetos)
3. El contenedor tenga altura definida

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🔧 Scripts Disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Preview del build
npm run lint     # Linting
```
