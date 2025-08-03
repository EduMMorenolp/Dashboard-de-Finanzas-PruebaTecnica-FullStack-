import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
// Importar rutas
import loadRoutes from "./routes/load.routes";
import saleRoutes from "./routes/sale.routes";
import expenseRoutes from "./routes/expense.routes";
import metricsRoutes from "./routes/metrics.routes";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.BASE_URL || "localhost:3000";

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
// @ts-ignore
import setupSwaggerV1 from "../swagger/v1/main";
setupSwaggerV1(app);

// Rutas
app.use("/api", loadRoutes);
app.use("/api", saleRoutes);
app.use("/api", expenseRoutes);
app.use("/api", metricsRoutes);

// Conexión a la base de datos
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("==================================================");
    console.log("📦 DB conectada correctamente");
    app.listen(PORT, () => {
      console.log("==================================================");
      console.log(`🚀 Servidor corriendo en: http://${HOST}`);
      console.log(`📃 Swagger Docs: http://${HOST}/api-docs`);
      console.log("==================================================\n");
    });
  })
  .catch((error) => {
    console.error("❌ Error conectando a la base de datos:", error);
  });
