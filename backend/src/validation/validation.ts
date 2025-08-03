import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Datos inválidos", errors: errors.array() });
  }
  next();
};

// amazonq-ignore-next-line
// amazonq-ignore-next-line
export const validateSale = [
  body("id_venta").notEmpty().withMessage("ID de venta requerido"),
  body("currency").isIn(["ARS", "USD"]).withMessage("Moneda debe ser ARS o USD"),
  body("amount").isFloat({ min: 0 }).withMessage("Monto debe ser positivo"),
  body("date").isISO8601().withMessage("Fecha inválida"),
  body("description").notEmpty().withMessage("Descripción requerida"),
  body("client").notEmpty().withMessage("Cliente requerido"),
  handleValidationErrors
];

export const validateExpense = [
  body("currency").isIn(["ARS", "USD"]).withMessage("Moneda debe ser ARS o USD"),
  body("amount").isFloat({ min: 0 }).withMessage("Monto debe ser positivo"),
  body("date").isISO8601().withMessage("Fecha inválida"),
  body("description").notEmpty().withMessage("Descripción requerida"),
  body("provider").notEmpty().withMessage("Proveedor requerido"),
  handleValidationErrors
];

export const validateId = [
  param("id").isInt({ min: 1 }).withMessage("ID debe ser un número positivo"),
  handleValidationErrors
];