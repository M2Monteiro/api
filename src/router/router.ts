import { Router, Request, Response } from "express";
import { UserController } from "../controller/UserController";

import statusRouter from "./status.routes";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.use("/api", statusRouter);

router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);
router.get("/api/private", authenticateToken, (req: Request, res: Response) => {
  return res.json({ msg: "private" });
});

export default router;
