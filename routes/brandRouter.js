import { Router } from "express";
import BrandController from "../controllers/brandController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), BrandController.create);
router.get("/", BrandController.getAll);
export default router;
