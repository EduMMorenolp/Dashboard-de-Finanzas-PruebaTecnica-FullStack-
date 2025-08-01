import { Router } from "express";
import {
  getExpenses,
  getExpense,
  postExpense,
  putExpense,
  deleteExpense,
} from "../controllers/expense.controller";

const router = Router();

router.get("/expenses/", getExpenses);
router.get("/expense/:id", getExpense);
router.post("/expense/", postExpense);
router.put("/expense/:id", putExpense);
router.delete("/expense/:id", deleteExpense);

export default router;
