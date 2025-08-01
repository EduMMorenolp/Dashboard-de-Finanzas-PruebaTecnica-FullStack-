import { Request, Response } from "express";
import * as metricsService from "../services/metrics.service";

export const getChartData = async (req: Request, res: Response) => {
  try {
    const { period = "month" } = req.query;
    const data = await metricsService.getChartData(period as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos del gráfico.", error });
  }
};

export const getMetrics = async (req: Request, res: Response) => {
  try {
    const { period = "month" } = req.query;
    const metrics = await metricsService.getFinancialMetrics(period as string);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener métricas.", error });
  }
};