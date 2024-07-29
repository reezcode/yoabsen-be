import { getRefreshSession, loginAdminC } from "../../controllers/admin/auth_controller";
import validateBody, { adminLoginSchema } from "../../core/validator";

const { Router } = require('express');

const authAdminRoute = Router();

authAdminRoute.post('/login', validateBody(adminLoginSchema), loginAdminC)
authAdminRoute.post('/refresh', getRefreshSession)

export default authAdminRoute;