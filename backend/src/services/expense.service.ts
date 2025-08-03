import {
  Expense,
  ExpenseAttributes,
  ExpenseCreationAttributes,
} from "../models/Expense";

/**
 * Obtiene todos los gastos.
 * @returns Lista de todos los gastos registrados.
 */
export const getAllExpenses = async (): Promise<Expense[]> => {
  try {
    return await Expense.findAll();
  } catch (error) {
    throw new Error("Failed to retrieve expenses");
  }
};

/**
 * Obtiene un gasto por ID.
 * @param id El ID del gasto.
 * @returns El gasto encontrado o null si no existe.
 */
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

/**
 * Crea un nuevo gasto.
 * @param data Los datos del gasto a crear.
 * @returns El gasto creado.
 */
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

/**
 * Actualiza un gasto existente.
 * @param id El ID del gasto a actualizar.
 * @param data Los nuevos datos del gasto.
 * @returns El gasto actualizado o null si no existe.
 */
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

/**
 * Elimina un gasto por ID.
 * @param id El ID del gasto a eliminar.
 * @returns El gasto eliminado o null si no existe.
 */
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
