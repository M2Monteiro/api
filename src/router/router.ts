import container from "../inversify.config";
import { Router, Request, Response } from "express";

import { authenticateToken } from "../middleware/auth";
import { UserController } from "../controller/UserController";
import statusRouter from "./status.routes";

const router = Router();

const userController = container.resolve<UserController>(UserController);

router.use("/api", statusRouter);

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);
router.get("/api/private", authenticateToken, (req: Request, res: Response) => {
  return res.json({ msg: "private" });
});

export default router;
