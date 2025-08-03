import fs from "fs";
import path from "path";

interface NormalizedSale {
  id: string;
  currency: string;
  amount: number;
  date: string;
  description: string;
  client: string;
}

interface NormalizedExpense {
  id: string;
  currency: string;
  amount: number;
  date: string;
  description: string;
  provider: string;
}

export const normalizeSales = (rawData: any): NormalizedSale[] => {
  return rawData.data_ventas.map((venta: any, index: number) => ({
    id:
      venta.id_venta ||
      `SALE-${String(venta.id || index + 1).padStart(3, "0")}`,
    currency: venta.currency,
    amount: venta.monto_ars || venta.monto_usd || 0,
    date:
      venta.detalles?.fecha ||
      venta.fecha ||
      venta.info_extra?.fecha_compra ||
      new Date().toISOString().split("T")[0],
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
};

export const normalizeExpenses = (rawData: any): NormalizedExpense[] => {
  return rawData.data_gastos.map((gasto: any, index: number) => ({
    id:
      gasto.id_gasto ||
      `GASTO-${String(gasto.id || index + 1).padStart(3, "0")}`,
    currency: gasto.currency,
    amount: gasto.monto_ars || gasto.monto_usd || 0,
    date:
      gasto.info_extra?.fecha_gasto ||
      gasto.fecha ||
      gasto.detalles?.fecha ||
      new Date().toISOString().split("T")[0],
    description:
      gasto.info_extra?.descripcion ||
      gasto.extra?.categoria ||
      gasto.detalles?.categoria ||
      "Sin descripción",
    provider:
      gasto.proveedor ||
      gasto.extra?.proveedor ||
      gasto.detalles?.proveedor ||
      "Sin proveedor",
  }));
};

export const normalizeJsonFiles = async (): Promise<void> => {
  try {
    const ventasPath = path.join(__dirname, "ventas.json");
    const gastosPath = path.join(__dirname, "gastos.json");

    // Normalizar ventas
    const ventasRaw = JSON.parse(fs.readFileSync(ventasPath, "utf-8"));
    const normalizedSales = normalizeSales(ventasRaw);
    fs.writeFileSync(
      path.join(__dirname, "ventas_normalized.json"),
      JSON.stringify({ data_ventas: normalizedSales }, null, 2)
    );

    // Normalizar gastos
    const gastosRaw = JSON.parse(fs.readFileSync(gastosPath, "utf-8"));
    const normalizedExpenses = normalizeExpenses(gastosRaw);
    fs.writeFileSync(
      path.join(__dirname, "gastos_normalized.json"),
      JSON.stringify({ data_gastos: normalizedExpenses }, null, 2)
    );

    console.log("✅ Archivos JSON normalizados correctamente");
  } catch (error) {
    const sanitizedError = String(error).replace(/[\r\n]/g, " ");
    console.error("❌ Error normalizando archivos JSON:", sanitizedError);
    throw new Error("Failed to normalize JSON files");
  }
};
