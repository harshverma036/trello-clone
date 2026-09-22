import { Router } from "express";
import AuthController from "./auth.controller";
import { authMiddleware } from "../../lib/auth.middleware";

const authController = new AuthController();

const authRouter: Router = Router();

// all auth routes
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/", authMiddleware, authController.getAllUsers);

export default authRouter;
