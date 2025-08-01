import { Request, Response } from "express";
import { loadSalesFromJSON, loadExpensesFromJSON } from "../data/loadData";
import { normalizeJsonFiles } from "../data/normalizeData";

export const loadAllData = async (_req: Request, res: Response) => {
  try {
    await loadSalesFromJSON();
    await loadExpensesFromJSON();
    res.status(200).json({ message: "Datos cargados correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error cargando datos.", error });
  }
};

export const normalizeData = async (_req: Request, res: Response) => {
  try {
    await normalizeJsonFiles();
    res.status(200).json({ message: "Datos normalizados correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error normalizando datos.", error });
  }
};
