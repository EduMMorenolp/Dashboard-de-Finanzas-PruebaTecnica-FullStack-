import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST!,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  logging: false,
});
