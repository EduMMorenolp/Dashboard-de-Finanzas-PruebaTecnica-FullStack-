import {
  Expense,
  ExpenseAttributes,
  ExpenseCreationAttributes,
} from "../models/Expense";

// Obtener todas las expenses
export const getAllExpenses = async (): Promise<Expense[]> => {
  try {
    return await Expense.findAll();
  } catch (error) {
    throw new Error("Failed to retrieve expenses");
  }
};

// Obtener expense por id
export const getExpenseById = async (id: number): Promise<Expense | null> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid ID provided");
  }
  try {
    return await Expense.findByPk(id);
  } catch (error) {
    throw new Error("Failed to retrieve expense");
  }
};

// Crear expense nuevo
export const createExpense = async (
  data: ExpenseCreationAttributes
): Promise<Expense> => {
  try {
    return await Expense.create(data);
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      if (error.parent?.constraint === "expenses_pkey") {
        throw new Error("DUPLICATE_ID");
      }
      throw new Error("DUPLICATE_ENTRY");
    }
    throw new Error("DATABASE_ERROR");
  }
};

// Actualizar expense existente
export const updateExpense = async (
  id: number,
  data: Partial<ExpenseAttributes>
): Promise<Expense | null> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid ID provided");
  }
  try {
    const expense = await Expense.findByPk(id);
    if (!expense) return null;
    return await expense.update(data);
  } catch (error) {
    throw new Error("Failed to update expense");
  }
};

// Eliminar expense
export const deleteExpense = async (id: number): Promise<Expense | null> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid ID provided");
  }
  try {
    const expense = await Expense.findByPk(id);
    if (!expense) return null;
    await expense.destroy();
    return expense;
  } catch (error) {
    throw new Error("Failed to delete expense");
  }
};
