import { Request, Response } from "express";
import * as saleService from "../services/sale.service";

export const getSales = async (_req: Request, res: Response) => {
  const sales = await saleService.getAllSales();
  res.json(sales);
};

export const getSale = async (req: Request, res: Response) => {
  const sale = await saleService.getSaleById(Number(req.params.id));
  if (!sale) return res.status(404).json({ message: "Sale not found" });
  res.json(sale);
};

export const createSale = async (req: Request, res: Response) => {
  const newSale = await saleService.createSale(req.body);
  res.status(201).json(newSale);
};

export const updateSale = async (req: Request, res: Response) => {
  const updated = await saleService.updateSale(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "Sale not found" });
  res.json(updated);
};

export const deleteSale = async (req: Request, res: Response) => {
  const deleted = await saleService.deleteSale(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "Sale not found" });
  res.json({ message: "Sale deleted" });
};
