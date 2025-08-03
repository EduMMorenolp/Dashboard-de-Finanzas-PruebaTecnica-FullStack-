import fs from "fs";
import path from "path";
import { Sale } from "../models/Sale";
import { Expense } from "../models/Expense";
import { normalizeSales, normalizeExpenses } from "./normalizeData";

export const loadSalesFromJSON = async (): Promise<void> => {
  try {
    const jsonPath = path.join(__dirname, "ventas.json");

    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Archivo no encontrado: ${jsonPath}`);
    }

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(rawData);

    if (!parsed.data_ventas || !Array.isArray(parsed.data_ventas)) {
      throw new Error("Estructura inválida: data_ventas debe ser un array");
    }

    const normalizedSales = normalizeSales(parsed);
    const validSales = normalizedSales.filter(
      (sale) =>
        sale.currency && sale.amount > 0 && sale.date && sale.description
    );

    if (validSales.length === 0) {
      throw new Error("No hay ventas válidas para cargar");
    }

    const sales = validSales.map((sale) => ({
      id_venta: sale.id,
      currency: sale.currency,
      amount: sale.amount,
      date: sale.date,
      description: sale.description,
      client: sale.client,
    }));

    const result = await Sale.bulkCreate(sales, {
      ignoreDuplicates: true,
      validate: true,
    });
  } catch (error) {
    const sanitizedError = String(error).replace(/[\r\n]/g, " ");
    console.error("❌ Error cargando ventas:", sanitizedError);
    throw error;
  }
};

export const loadExpensesFromJSON = async (): Promise<void> => {
  try {
    const jsonPath = path.join(__dirname, "gastos.json");

    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Archivo no encontrado: ${jsonPath}`);
    }

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(rawData);

    if (!parsed.data_gastos || !Array.isArray(parsed.data_gastos)) {
      throw new Error("Estructura inválida: data_gastos debe ser un array");
    }

    const normalizedExpenses = normalizeExpenses(parsed);
    const validExpenses = normalizedExpenses.filter(
      (expense) =>
        expense.currency &&
        expense.amount > 0 &&
        expense.date &&
        expense.description
    );

    if (validExpenses.length === 0) {
      throw new Error("No hay gastos válidos para cargar");
    }

    const expenses = validExpenses.map((expense) => ({
      currency: expense.currency,
      amount: expense.amount,
      date: expense.date,
      description: expense.description,
      provider: expense.provider,
    }));

    const result = await Expense.bulkCreate(expenses, {
      ignoreDuplicates: true,
      validate: true,
    });

    console.log(
      `✔ ${result.length} gastos cargados de ${normalizedExpenses.length} registros`
    );
  } catch (error) {
    const sanitizedError = String(error).replace(/[\r\n]/g, " ");
    console.error("❌ Error cargando gastos:", sanitizedError);
    throw error;
  }
};
