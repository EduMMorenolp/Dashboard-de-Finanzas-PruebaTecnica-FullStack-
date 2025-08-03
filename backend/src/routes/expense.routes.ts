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
// amazonq-ignore-next-line
router.put("/expense/:id", validateId, validateExpense, putExpense);
// amazonq-ignore-next-line
router.delete("/expense/:id", validateId, deleteExpense);

export default router;
