import { downloadExcelC } from "../../controllers/admin/attandance_history_controller";
import { authMiddleware } from "../../core/commons/middlewares/auth";

const { Router } = require('express');

const attendanceHistoryRoutes = Router();

attendanceHistoryRoutes.use(authMiddleware)

attendanceHistoryRoutes.get('/download-excel', downloadExcelC)

export default attendanceHistoryRoutes;