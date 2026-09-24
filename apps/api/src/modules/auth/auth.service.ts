import db from "@repo/db";
import {
  type RegisterSchema,
  type JwtTokenSchema,
  jwtTokenSchema,
  type LoginSchema,
} from "@repo/schema/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appConfig from "../../lib/appConfig";
import { OAuth2Client } from "google-auth-library";
import { AppError } from "../../lib/appError";

class AuthService {
  // TODO: define response interface
  static async register(data: RegisterSchema): Promise<any> {
    try {
      // checking if email already exists
      const isEmailExsits = await db.user.findUnique({
        where: {
          email: data?.email,
        },
      });

      if (isEmailExsits) {
        throw AppError.notFound("User not found");
      }

      let hashPassword: string | null = null;

      // hash password
      if (data?.source === "EMAIL") {
        hashPassword = bcrypt.hashSync(data?.password!, 10);
      }

      // saving it into database
      const nUser = await db.user.create({
        data: {
          ...data,
          password: hashPassword,
          profile_pic_url: data?.profile_pic_url || null,
        },
      });

      return {
        data: nUser,
        success: true,
        message: "User registered sucessfully",
      };
    } catch (error) {
      throw error;
    }
  }

  private static async _decodeGoogleToken(code: string): Promise<any> {
    // initialize client
    const client = new OAuth2Client(
      appConfig.GOOGLE.CLIENT_ID,
      appConfig.GOOGLE.CLIENT_SECRET,
      "postmessage",
    );

    const token = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: token?.tokens?.id_token!,
      audience: appConfig.GOOGLE.CLIENT_ID,
    });

    const data = ticket?.getPayload();

    return data;
  }

  static async login(data: LoginSchema): Promise<any> {
    try {
      let email = data?.email;
      let decodeGoogleToken;

      if (data?.source === "GOOGLE" && !email && data?.google_code) {
        decodeGoogleToken = await this._decodeGoogleToken(data?.google_code);
        email = decodeGoogleToken?.email;
      }

      // check if email exists
      let isExists = await db.user.findFirst({
        where: {
          email: email!,
          active: true,
        },
      });

      if (!isExists && data?.source === "EMAIL") {
        throw AppError.notFound("User not found");
      }

      if (isExists && !isExists?.active && data?.source === "EMAIL") {
        throw AppError.badRequest("User is not active");
      }

      // check for password
      if (data?.source === "EMAIL" && data?.password) {
        // check if valid password
        const isValidPass = bcrypt.compareSync(
          data?.password,
          isExists?.password!,
        );

        if (!isValidPass) {
          throw AppError.unauthorized("Incorrect password");
        }
      }

      if (data?.source === "GOOGLE" && !isExists && data?.google_code) {
        // register and return login with jwt token
        const nUser = await db.user.create({
          data: {
            email: email!,
            active: true,
            name: decodeGoogleToken?.name,
            profile_pic_url: decodeGoogleToken?.picture,
            role: "USER",
            source: "GOOGLE",
          },
        });

        isExists = nUser;
      }

      const genJwt = this._generateJwtToken({
        active: true,
        email: isExists?.email!,
        role: isExists?.role!,
        user_id: isExists?.id!,
      });

      const { password, updatedAt, createdAt, ...rest } = isExists!;

      return {
        success: true,
        message: "User logged in sucessfully",
        data: {
          token: genJwt?.token,
          user: rest,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  private static _generateJwtToken(data: JwtTokenSchema) {
    // validating the data
    const validPayload = jwtTokenSchema.safeParse(data);

    if (validPayload?.error) {
      return {
        success: false,
        token: null,
      };
    }

    const token = jwt.sign(validPayload, appConfig.JWT_SECRET_KEY);

    return {
      success: true,
      token,
    };
  }
}

export default AuthService;
