import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import loadRoutes from "./routes/load.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", loadRoutes);

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
