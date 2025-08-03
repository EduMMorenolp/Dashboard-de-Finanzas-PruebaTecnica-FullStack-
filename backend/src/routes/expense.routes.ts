import { Router } from "express";
import {
  getExpenses,
  getExpense,
  postExpense,
  putExpense,
  deleteExpense,
} from "../controllers/expense.controller";
import { validateExpense, validateId } from "../validation/validation";

const router = Router();

router.get("/expenses/", getExpenses);
router.get("/expense/:id", validateId, getExpense);
router.post("/expense/", validateExpense, postExpense);
router.put("/expense/:id", validateId, validateExpense, putExpense);
router.delete("/expense/:id", validateId, deleteExpense);

export default router;
