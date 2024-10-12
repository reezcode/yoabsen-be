import { getLocationC, updateLocationC } from "../../controllers/admin/location_controller";
import { authMiddleware } from "../../core/commons/middlewares/auth";
import validateBody, { locationSchema } from "../../core/validator";

const { Router } = require('express');

const locationRoutes = Router();

locationRoutes.use(authMiddleware)

locationRoutes.put('/update', validateBody(locationSchema) ,updateLocationC)
locationRoutes.get('/view', getLocationC)

export default locationRoutes;