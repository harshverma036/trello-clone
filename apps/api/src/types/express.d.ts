import { type JwtTokenSchema } from "@repo/schema/auth";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
