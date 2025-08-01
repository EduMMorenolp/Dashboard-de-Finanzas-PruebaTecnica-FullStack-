import fs from "fs";
import path from "path";
import { Sale } from "../models/Sale";
import { Expense } from "../models/Expense";

export const loadSalesFromJSON = async (): Promise<void> => {
  const jsonPath = path.join(__dirname, "ventas.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const parsed = JSON.parse(rawData);

  if (!parsed.data_ventas)
    throw new Error("No se encontró data_ventas en ventas.json");

  const sales = parsed.data_ventas.map((venta: any) => ({
    id_venta: venta.id_venta || `NO-ID-${Math.random()}`,
    currency: venta.currency,
    amount: venta.monto_ars || venta.monto_usd || 0,
    date:
      venta.detalles?.fecha ||
      venta.fecha ||
      venta.info_extra?.fecha_compra ||
      new Date().toISOString(),
    description:
      venta.detalles?.producto ||
      venta.extra?.producto ||
      venta.info_extra?.descripcion ||
      "Sin descripción",
    client:
      venta.detalles?.cliente ||
      venta.extra?.cliente ||
      venta.cliente ||
      "Desconocido",
  }));

  await Sale.bulkCreate(sales);
  console.log("✔ Ventas cargadas");
};

export const loadExpensesFromJSON = async (): Promise<void> => {
  const jsonPath = path.join(__dirname, "gastos.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const parsed = JSON.parse(rawData);

  if (!parsed.data_gastos)
    throw new Error("No se encontró data_gastos en gastos.json");

  const expenses = parsed.data_gastos.map((gasto: any) => ({
    currency: gasto.currency,
    amount: gasto.monto_ars || gasto.monto_usd || 0,
    date: gasto.info_extra?.fecha_gasto || new Date().toISOString(),
    description: gasto.info_extra?.descripcion || "Sin descripción",
    provider: gasto.proveedor || "Sin proveedor",
  }));

  await Expense.bulkCreate(expenses);
  console.log("✔ Gastos cargados");
};
