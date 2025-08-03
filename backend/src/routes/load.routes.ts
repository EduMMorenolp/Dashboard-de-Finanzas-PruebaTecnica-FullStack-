import { Router } from "express";
import { loadAllData, normalizeData } from "../controllers/load.controller";

const router = Router();

router.post("/load", loadAllData);
router.post("/normalize", normalizeData);

export default router;
