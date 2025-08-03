import { Request, Response } from "express";
import * as metricsService from "../services/metrics.service";

/**
 * Obtiene datos para gráficos organizados por período.
 * @param req.query.period El período de agrupación (day, week, month, year).
 * @returns Datos de ventas y gastos agrupados por el período especificado.
 */
export const getChartData = async (req: Request, res: Response) => {
  try {
    const { period = "month" } = req.query;
    const data = await metricsService.getChartData(period as string);
    res.json(data);
  } catch (error) {
    console.error('Error getting chart data:', error);
    res.status(500).json({ message: "Error al obtener datos del gráfico." });
  }
};

/**
 * Obtiene métricas financieras resumidas.
 * @param req.query.period El período para calcular las métricas (day, week, month, year).
 * @returns Totales de ventas, gastos y ganancias por moneda.
 */
export const getMetrics = async (req: Request, res: Response) => {
  try {
    const { period = "month" } = req.query;
    const metrics = await metricsService.getFinancialMetrics(period as string);
    res.json(metrics);
  } catch (error) {
    console.error('Error getting metrics:', error);
    res.status(500).json({ message: "Error al obtener métricas." });
  }
};