import { Sale } from "../models/Sale";
import { SaleCreationAttributes } from "../models/Sale";

export const getAllSales = async () => {
  return await Sale.findAll();
};

export const getSaleById = async (id: number) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid ID provided');
  }
  return await Sale.findByPk(id);
};

export const createSale = async (data: SaleCreationAttributes) => {
  return await Sale.create(data);
};

export const updateSale = async (id: number, data: Partial<Sale>) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid ID provided');
  }
  const sale = await Sale.findByPk(id);
  if (!sale) return null;
  return await sale.update(data);
};

export const deleteSale = async (id: number) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid ID provided');
  }
  const sale = await Sale.findByPk(id);
  if (!sale) return null;
  await sale.destroy();
  return sale;
};
