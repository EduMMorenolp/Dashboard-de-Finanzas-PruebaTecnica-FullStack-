import { Router } from "express";
import { getChartData, getMetrics } from "../controllers/metrics.controller";

const router = Router();

router.get("/chart", getChartData);
router.get("/metrics", getMetrics);

export default router;