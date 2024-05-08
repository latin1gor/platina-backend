import { Router } from "express";
const router = new Router();
import deviceController from "../controllers/deviceController.js";
import multer from "multer"
import path from "path";
import {v4 as uuidv4} from "uuid"

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

const multParce = multer({storage: storage})



router.post("/", multParce.single("img") ,deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.get("/count", deviceController.getAllCount);
export default router;
