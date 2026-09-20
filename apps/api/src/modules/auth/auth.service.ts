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
        throw Error("Email already exists");
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

  static async login(data: LoginSchema): Promise<any> {
    try {
      // check if email exists
      const isExists = await db.user.findFirst({
        where: {
          email: data?.email,
          active: true,
        },
      });

      if (!isExists) {
        throw Error("User not found!");
      }

      if (isExists && !isExists?.active) {
        throw Error("User is not active!!");
      }

      // check for password
      if (data?.source === "EMAIL" && data?.password) {
        // check if valid password
        const isValidPass = bcrypt.compareSync(
          data?.password,
          isExists?.password!,
        );

        if (!isValidPass) {
          throw Error("Passowrd is incorrect!");
        }
      }

      const genJwt = this._generateJwtToken({
        active: true,
        email: isExists?.email,
        role: isExists?.role,
        user_id: isExists?.id,
      });

      const { password, updatedAt, createdAt, ...rest } = isExists;

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
