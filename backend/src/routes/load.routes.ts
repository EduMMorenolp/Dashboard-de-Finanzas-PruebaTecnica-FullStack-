import { Router } from "express";
import { loadAllData } from "../controllers/expense.controller";

const router = Router();

router.post("/load", loadAllData);

export default router;
