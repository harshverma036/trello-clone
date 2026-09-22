import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import appConfig from "./appConfig";
// Bearer <TOKEN>
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    !req?.headers?.authorization &&
    !req?.headers?.authorization?.includes("Bearer")
  ) {
    // throw error
    return res.status(401).json({
      message: "Token not found",
      success: false,
    });
  }

  // validate token if expired or not
  const tokenFromAuth = req?.headers?.authorization?.split(" ")?.[1]?.trim(); // ["Bearer", "<TOKEN>"]

  try {
    const decodedToken = jwt.verify(tokenFromAuth!, appConfig.JWT_SECRET_KEY);

    req.user = decodedToken;

    next();
  } catch (error: any) {
    console.error(error);
    return res.status(401).json({
      message: `Invalid token - ${error?.message}`,
      success: false,
    });
  }
};
