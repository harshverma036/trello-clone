import { Router } from "express";
import AuthController from "./auth.controller";

const authController = new AuthController();

const authRouter: Router = Router();

// all auth routes
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export default authRouter;
