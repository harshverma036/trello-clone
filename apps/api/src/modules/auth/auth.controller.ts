import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "@repo/schema/auth";
import AuthService from "./auth.service";

// const authService = new AuthService();

class AuthController {
  async login(req: Request, res: Response): Promise<any> {
    const checkPayload = loginSchema.safeParse(req?.body);

    if (!checkPayload.success) {
      return res.status(422).json({
        success: false,
        message: JSON.parse(checkPayload?.error as any),
        data: checkPayload?.data,
      });
    }

    const payload = checkPayload?.data;

    const execute = await AuthService.login(payload);

    return res.status(200).json(execute);
  }

  async register(req: Request, res: Response): Promise<any> {
    const checkPayload = registerSchema.safeParse(req?.body);

    if (!checkPayload.success) {
      return res.status(422).json({
        success: false,
        message: JSON.parse(checkPayload?.error as any),
        data: checkPayload?.data,
      });
    }

    const payload = checkPayload?.data;

    const execute = await AuthService.register(payload);

    return res.status(200).json({
      success: true,
      message: "Registered successfully!!",
      data: execute,
    });
  }

  async resetPassword(req: Request, res: Response): Promise<any> {}

  async updateUser(req: Request, res: Response): Promise<any> {}

  async forgotPassword(req: Request, res: Response): Promise<any> {}

  async getMe(req: Request, res: Response): Promise<any> {}

  async getAllUsers(req: Request, res: Response): Promise<any> {}
}

export default AuthController;
