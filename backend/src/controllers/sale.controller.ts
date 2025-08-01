import { Request, Response } from "express";
import * as saleService from "../services/sale.service";

export const getSales = async (_req: Request, res: Response) => {
  try {
    const sales = await saleService.getAllSales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas.", error });
  }
};

export const getSale = async (req: Request, res: Response) => {
  try {
    const sale = await saleService.getSaleById(Number(req.params.id));
    if (!sale) return res.status(404).json({ message: "Venta no encontrada" });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar venta.", error });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const newSale = await saleService.createSale(req.body);
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: "Error al crear venta.", error });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  try {
    const updated = await saleService.updateSale(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: "Venta no encontrada" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar venta.", error });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const deleted = await saleService.deleteSale(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Venta no encontrada" });
    res.json({ message: "Venta eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar venta.", error });
  }
};
