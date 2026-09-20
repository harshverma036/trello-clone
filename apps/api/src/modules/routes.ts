import { Router } from "express";
import authRouter from "./auth/auth.routes";

const applicationRouter: Router = Router();

applicationRouter.use('/auth', authRouter);

export default applicationRouter;
