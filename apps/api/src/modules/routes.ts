import { Router } from "express";
import authRouter from "./auth/auth.routes";
import workspaceRoutes from "./workspace/workspace.routes";
import { authMiddleware } from "../lib/auth.middleware";

const applicationRouter: Router = Router();

applicationRouter.use("/auth", authRouter);
applicationRouter.use("/workspace", authMiddleware, workspaceRoutes);

export default applicationRouter;
