
import { getCurrentTime, getDashboardC, getWorkScheduleC } from "../../controllers/staff/dashboard_controller";
import { authMiddleware } from "../../core/commons/middlewares/auth";

const { Router } = require('express');

const dashboardRoutes = Router();

dashboardRoutes.use(authMiddleware)

dashboardRoutes.get('/', getDashboardC)
dashboardRoutes.get('/time', getCurrentTime)
dashboardRoutes.get('/schedule', getWorkScheduleC)

export default dashboardRoutes;