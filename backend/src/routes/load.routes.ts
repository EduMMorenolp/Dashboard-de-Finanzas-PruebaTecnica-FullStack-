import { Router } from "express";
import { loadAllData, normalizeData } from "../controllers/load.controller";

const router = Router();

// amazonq-ignore-next-line
router.post("/load", loadAllData);
// amazonq-ignore-next-line
router.post("/normalize", normalizeData);

export default router;
