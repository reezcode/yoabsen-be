import { dashboardAdminC } from "../../controllers/admin/dashboard_controller";
import { adminMiddleware } from "../../core/commons/middlewares/admin";

const { Router } = require('express');

const dashboardRoutesAdmin = Router();

dashboardRoutesAdmin.use(adminMiddleware)

dashboardRoutesAdmin.get('/', dashboardAdminC)

export default dashboardRoutesAdmin;