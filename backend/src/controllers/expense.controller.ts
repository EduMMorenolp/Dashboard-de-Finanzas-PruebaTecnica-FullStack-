import { Request, Response } from "express";
import * as expenseService from "../services/expense.service";

/**
 * Obtiene todos los gastos.
 * @returns Lista de todos los gastos registrados.
 */
export const getExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.json(expenses);
  } catch (error) {
    console.error("Error getting expenses:", error);
    res.status(500).json({ message: "Error al obtener gastos." });
  }
};

/**
 * Obtiene un gasto por ID.
 * @param req.params.id El ID del gasto.
 * @returns El gasto encontrado o error 404 si no existe.
 */
export const getExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.getExpenseById(Number(req.params.id));
    if (!expense)
      return res.status(404).json({ message: "Gasto no encontrado" });
    res.json(expense);
  } catch (error) {
    console.error("Error getting expense:", error);
    res.status(500).json({ message: "Error al buscar gasto." });
  }
};

/**
 * Crea un nuevo gasto.
 * @param req.body Los datos del gasto a crear.
 * @returns El gasto creado o error si hay duplicados.
 */
export const postExpense = async (req: Request, res: Response) => {
  try {
    const newExpense = await expenseService.createExpense(req.body);
    res.status(201).json(newExpense);
  } catch (error: any) {
    console.error("Error creating expense:", error);

    if (error.message === "DUPLICATE_ID") {
      return res.status(409).json({
        message: "El ID del gasto ya existe.",
        code: "DUPLICATE_ID",
      });
    }

    if (error.message === "DUPLICATE_ENTRY") {
      return res.status(409).json({
        message: "Ya existe un gasto con estos datos.",
        code: "DUPLICATE_ENTRY",
      });
    }

    res.status(500).json({ message: "Error al crear gasto." });
  }
};

/**
 * Actualiza un gasto existente.
 * @param req.params.id El ID del gasto a actualizar.
 * @param req.body Los nuevos datos del gasto.
 * @returns El gasto actualizado o error 404 si no existe.
 */
export const putExpense = async (req: Request, res: Response) => {
  try {
    const updatedExpense = await expenseService.updateExpense(
      Number(req.params.id),
      req.body
    );
    if (!updatedExpense)
      return res.status(404).json({ message: "Gasto no encontrado" });
    res.json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Error al actualizar gasto." });
  }
};

/**
 * Elimina un gasto por ID.
 * @param req.params.id El ID del gasto a eliminar.
 * @returns Mensaje de confirmación o error 404 si no existe.
 */
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const deletedExpense = await expenseService.deleteExpense(
      Number(req.params.id)
    );
    if (!deletedExpense)
      return res.status(404).json({ message: "Gasto no encontrado" });
    res.json({ message: "Gasto eliminado" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Error al eliminar gasto." });
  }
};
