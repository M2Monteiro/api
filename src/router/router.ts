import { Router, Request, Response } from "express";
import { UserController } from "../controller/UserController";

import statusRouter from "./status.routes";

const router = Router();

router.use("/api", statusRouter);

router.post("/api/register", UserController.register);

export default router;
