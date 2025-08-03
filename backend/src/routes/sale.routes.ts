import { Router } from "express";
import {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
} from "../controllers/sale.controller";
import { validateSale, validateId } from "../validation/validation";

const router = Router();

router.get("/sales/", getSales);
router.get("/sale/:id", validateId, getSale);
router.post("/sale/", validateSale, createSale);
// amazonq-ignore-next-line
router.put("/sale/:id", validateId, validateSale, updateSale);
// amazonq-ignore-next-line
router.delete("/sale/:id", validateId, deleteSale);

export default router;
