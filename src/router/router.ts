import container from "@container/inversify.config";
import { Router, Request, Response } from "express";

import { authenticateToken } from "@middleware/auth";
import { UserController } from "@controller/UserController";

const router = Router();

const userController = container.resolve<UserController>(UserController);

router.use("/api/status", (req: Request, res: Response) => {
  res.status(200).json({ status: "online" });
});

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);
router.get("/api/private", authenticateToken, (req: Request, res: Response) => {
  return res.json({ msg: "private" });
});

export default router;
// eu te amo