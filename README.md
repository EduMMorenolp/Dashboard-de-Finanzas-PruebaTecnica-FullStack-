```bash
backend/
├── src/
│   ├── config/              # Configuración de base de datos, variables, etc.
│   │   └── database.ts
│   │
│   ├── controllers/         # Controladores (interfaz HTTP)
│   │   ├── expense.controller.ts
│   │   ├── sale.controller.ts
│   │   └── load.controller.ts
│   │
│   ├── data/                # Archivos JSON y lógica de carga
│   │   ├── gastos.json
│   │   ├── ventas.json
│   │   └── loadData.ts
│   │
│   ├── models/              # Definición de modelos Sequelize
│   │   ├── Expense.ts
│   │   └── Sale.ts
│   │
│   ├── routes/              # Archivos de rutas Express
│   │   ├── expense.routes.ts
│   │   ├── sale.routes.ts
│   │   └── load.routes.ts
│   │
│   ├── services/            # Lógica de negocio
│   │   ├── expense.service.ts
│   │   └── sale.service.ts
│   │
│   └── index.ts             # Entry point del servidor
│
├── .env                     # Variables de entorno
├── .gitignore               # Ignorar dist, node_modules, .env, etc.
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración de TypeScript

```
