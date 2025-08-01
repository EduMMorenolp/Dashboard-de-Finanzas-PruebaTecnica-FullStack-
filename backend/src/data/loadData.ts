import fs from "fs";
import path from "path";
import { Sale } from "../models/Sale";
import { Expense } from "../models/Expense";
import { normalizeSales, normalizeExpenses } from "./normalizeData";

export const loadSalesFromJSON = async (): Promise<void> => {
  const jsonPath = path.join(__dirname, "ventas.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const parsed = JSON.parse(rawData);

  if (!parsed.data_ventas)
    throw new Error("No se encontró data_ventas en ventas.json");

  const normalizedSales = normalizeSales(parsed);
  const sales = normalizedSales.map(sale => ({
    id_venta: sale.id,
    currency: sale.currency,
    amount: sale.amount,
    date: sale.date,
    description: sale.description,
    client: sale.client
  }));

  await Sale.bulkCreate(sales, { ignoreDuplicates: true });
  console.log("✔ Ventas cargadas");
};

export const loadExpensesFromJSON = async (): Promise<void> => {
  const jsonPath = path.join(__dirname, "gastos.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const parsed = JSON.parse(rawData);

  if (!parsed.data_gastos)
    throw new Error("No se encontró data_gastos en gastos.json");

  const normalizedExpenses = normalizeExpenses(parsed);
  const expenses = normalizedExpenses.map(expense => ({
    currency: expense.currency,
    amount: expense.amount,
    date: expense.date,
    description: expense.description,
    provider: expense.provider
  }));

  await Expense.bulkCreate(expenses, { ignoreDuplicates: true });
  console.log("✔ Gastos cargados");
};
