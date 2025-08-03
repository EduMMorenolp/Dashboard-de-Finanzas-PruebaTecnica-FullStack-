import { Request, Response } from "express";
import { loadSalesFromJSON, loadExpensesFromJSON } from "../data/loadData";
import { normalizeJsonFiles } from "../data/normalizeData";

/**
 * Carga todos los datos desde archivos JSON a la base de datos.
 * @returns Resultado de la carga con contadores y errores si los hay.
 */
export const loadAllData = async (_req: Request, res: Response) => {
  const results = { sales: 0, expenses: 0, errors: [] as string[] };
  
  try {
    await loadSalesFromJSON();
    results.sales = 1;
  } catch (error) {
    results.errors.push(`Ventas: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }

  try {
    await loadExpensesFromJSON();
    results.expenses = 1;
  } catch (error) {
    results.errors.push(`Gastos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }

  if (results.errors.length > 0) {
    return res.status(207).json({ 
      message: "Carga parcial completada", 
      results,
      errors: results.errors 
    });
  }

  res.status(200).json({ 
    message: "Datos cargados correctamente", 
    results 
  });
};

/**
 * Normaliza los archivos JSON de datos.
 * @returns Confirmación de normalización exitosa o error.
 */
export const normalizeData = async (_req: Request, res: Response) => {
  try {
    await normalizeJsonFiles();
    res.status(200).json({ message: "Datos normalizados correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error normalizando datos.", error });
  }
};
