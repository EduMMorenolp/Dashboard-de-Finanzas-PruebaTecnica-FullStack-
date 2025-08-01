import { Router } from "express";
import {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
} from "../controllers/sale.controller";

const router = Router();

router.get("/sales/", getSales);
router.get("/sale/:id", getSale);
router.post("/sale/", createSale);
router.put("/sale/:id", updateSale);
router.delete("/sale/:id", deleteSale);

export default router;
