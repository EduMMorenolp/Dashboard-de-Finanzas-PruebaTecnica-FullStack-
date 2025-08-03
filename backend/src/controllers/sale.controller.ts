import { Request, Response } from "express";
import * as saleService from "../services/sale.service";

export const getSales = async (_req: Request, res: Response) => {
  try {
    const sales = await saleService.getAllSales();
    res.json(sales);
  } catch (error) {
    console.error("Error getting sales:", error);
    res.status(500).json({ message: "Error al obtener ventas." });
  }
};

export const getSale = async (req: Request, res: Response) => {
  try {
    const sale = await saleService.getSaleById(Number(req.params.id));
    if (!sale) return res.status(404).json({ message: "Venta no encontrada" });
    res.json(sale);
  } catch (error) {
    console.error("Error getting sale:", error);
    res.status(500).json({ message: "Error al buscar venta." });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const newSale = await saleService.createSale(req.body);
    res.status(201).json(newSale);
  } catch (error: any) {
    console.error("Error creating sale:", error);

    if (error.message === "DUPLICATE_ID") {
      return res.status(409).json({
        message: "El ID de la venta ya existe.",
        code: "DUPLICATE_ID",
      });
    }

    if (error.message === "DUPLICATE_SALE_ID") {
      return res.status(409).json({
        message: "El ID de venta (id_venta) ya existe.",
        code: "DUPLICATE_SALE_ID",
      });
    }

    if (error.message === "DUPLICATE_ENTRY") {
      return res.status(409).json({
        message: "Ya existe una venta con estos datos.",
        code: "DUPLICATE_ENTRY",
      });
    }

    res.status(500).json({ message: "Error al crear venta." });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  try {
    const updated = await saleService.updateSale(
      Number(req.params.id),
      req.body
    );
    if (!updated)
      return res.status(404).json({ message: "Venta no encontrada" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).json({ message: "Error al actualizar venta." });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const deleted = await saleService.deleteSale(Number(req.params.id));
    if (!deleted)
      return res.status(404).json({ message: "Venta no encontrada" });
    res.json({ message: "Venta eliminada" });
  } catch (error) {
    console.error("Error deleting sale:", error);
    res.status(500).json({ message: "Error al eliminar venta." });
  }
};
