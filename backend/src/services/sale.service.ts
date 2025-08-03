import { Sale } from "../models/Sale";
import { SaleCreationAttributes } from "../models/Sale";

/**
 * Obtiene todas las ventas.
 * @returns Lista de todas las ventas registradas.
 */
export const getAllSales = async () => {
  return await Sale.findAll();
};

/**
 * Obtiene una venta por ID.
 * @param id El ID de la venta.
 * @returns La venta encontrada o null si no existe.
 */
export const getSaleById = async (id: number) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid ID provided");
  }
  return await Sale.findByPk(id);
};

/**
 * Crea una nueva venta.
 * @param data Los datos de la venta a crear.
 * @returns La venta creada.
 */
export const createSale = async (data: SaleCreationAttributes) => {
  try {
    return await Sale.create(data);
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      if (error.parent?.constraint === "sales_pkey") {
        throw new Error("DUPLICATE_ID");
      }
      if (error.parent?.constraint?.includes("id_venta")) {
        throw new Error("DUPLICATE_SALE_ID");
      }
      throw new Error("DUPLICATE_ENTRY");
    }
    throw new Error("DATABASE_ERROR");
  }
};

/**
 * Actualiza una venta existente.
 * @param id El ID de la venta a actualizar.
 * @param data Los nuevos datos de la venta.
 * @returns La venta actualizada o null si no existe.
 */
export const updateSale = async (id: number, data: Partial<Sale>) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid ID provided");
  }
  const sale = await Sale.findByPk(id);
  if (!sale) return null;
  return await sale.update(data);
};

/**
 * Elimina una venta por ID.
 * @param id El ID de la venta a eliminar.
 * @returns La venta eliminada o null si no existe.
 */
export const deleteSale = async (id: number) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid ID provided");
  }
  const sale = await Sale.findByPk(id);
  if (!sale) return null;
  await sale.destroy();
  return sale;
};
