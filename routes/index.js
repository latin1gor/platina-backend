import Router from "express";
const router = new Router();
import userRouter from "./userRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";
import deviceRouter from "./deviceRouter.js";
import infoRouter from "./infoRouter.js";
router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/info", infoRouter)

export default router;
