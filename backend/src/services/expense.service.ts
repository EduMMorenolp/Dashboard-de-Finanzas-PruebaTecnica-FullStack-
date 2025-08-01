import {
  Expense,
  ExpenseAttributes,
  ExpenseCreationAttributes,
} from "../models/Expense";

// Obtener todas las expenses
export const getAllExpenses = async (): Promise<Expense[]> => {
  return await Expense.findAll();
};

// Obtener expense por id
export const getExpenseById = async (id: number): Promise<Expense | null> => {
  return await Expense.findByPk(id);
};

// Crear expense nuevo
export const createExpense = async (
  data: ExpenseCreationAttributes
): Promise<Expense> => {
  return await Expense.create(data);
};

// Actualizar expense existente
export const updateExpense = async (
  id: number,
  data: Partial<ExpenseAttributes>
): Promise<Expense | null> => {
  const expense = await Expense.findByPk(id);
  if (!expense) return null;
  return await expense.update(data);
};

// Eliminar expense
export const deleteExpense = async (id: number): Promise<Expense | null> => {
  const expense = await Expense.findByPk(id);
  if (!expense) return null;
  await expense.destroy();
  return expense;
};
