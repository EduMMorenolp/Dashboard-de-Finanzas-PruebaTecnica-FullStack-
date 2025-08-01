import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
// Importar rutas
import loadRoutes from "./routes/load.routes";
import saleRoutes from "./routes/sale.routes";
import expenseRoutes from "./routes/expense.routes";

const app = express();
const PORT = process.env.PORT || 3000;

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

// Conexión a la base de datos
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("📦 DB conectada correctamente");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error conectando a la base de datos:", error);
  });
