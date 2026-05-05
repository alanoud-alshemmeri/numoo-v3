import { Router, type IRouter } from "express";
import healthRouter from "./health";
import backupRouter from "./backup";
import translateReportRouter from "./translate-report";
import visualScheduleRouter from "./visual-schedule";
import askRouter from "./ask";

const router: IRouter = Router();

router.use(healthRouter);
router.use(backupRouter);
router.use(translateReportRouter);
router.use(visualScheduleRouter);
router.use(askRouter);

export default router;
