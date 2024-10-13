import { downloadExcelC } from "../../controllers/admin/attandance_history_controller";
import { adminMiddleware } from "../../core/commons/middlewares/admin";

const { Router } = require('express');

const attendanceHistoryRoutes = Router();

attendanceHistoryRoutes.use(adminMiddleware)

attendanceHistoryRoutes.get('/download-excel', downloadExcelC)

export default attendanceHistoryRoutes;