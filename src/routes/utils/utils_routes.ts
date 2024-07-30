import { uploadFileC } from "../../controllers/utils/upload_controller";
import { authMiddleware } from "../../core/commons/middlewares/auth";

const { Router } = require('express');
const multer = require('multer');

const utilRoutes = Router();
const upload = multer({ storage: multer.memoryStorage() });

utilRoutes.use(authMiddleware)
utilRoutes.post('/upload', upload.single('file'), uploadFileC)

export default utilRoutes;