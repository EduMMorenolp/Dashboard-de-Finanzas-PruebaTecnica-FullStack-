import { Request, Response } from "express";
import * as expenseService from "../services/expense.service";

export const getExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.json(expenses);
  } catch (error) {
    console.error('Error getting expenses:', error);
    res.status(500).json({ message: "Error al obtener gastos." });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.getExpenseById(Number(req.params.id));
    if (!expense)
      return res.status(404).json({ message: "Gasto no encontrado" });
    res.json(expense);
  } catch (error) {
    console.error('Error getting expense:', error);
    res.status(500).json({ message: "Error al buscar gasto." });
  }
};

export const postExpense = async (req: Request, res: Response) => {
  try {
    const newExpense = await expenseService.createExpense(req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: "Error al crear gasto." });
  }
};

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
    console.error('Error updating expense:', error);
    res.status(500).json({ message: "Error al actualizar gasto." });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const deletedExpense = await expenseService.deleteExpense(
      Number(req.params.id)
    );
    if (!deletedExpense)
      return res.status(404).json({ message: "Gasto no encontrado" });
    res.json({ message: "Gasto eliminado" });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: "Error al eliminar gasto." });
  }
};
