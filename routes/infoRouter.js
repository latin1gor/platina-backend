import { Router } from "express";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import infoController from "../controllers/infoController.js";
const router = new Router();

router.get("/", checkRoleMiddleware("ADMIN"), infoController.getAllUsers);

export default router;
