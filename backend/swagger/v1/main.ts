import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerSpec";
import { Express } from "express";

const setupSwaggerV1 = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwaggerV1;