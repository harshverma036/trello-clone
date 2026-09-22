import * as z from "zod";

const source = [];

// ======================== REGISTER START ======================
export const registerSchema = z.object({
  name: z.string({
    error: "Name is required!",
  }),
  email: z.email({
    error: "Email is required",
  }),
  role: z.enum(["ADMIN", "USER"]),
  source: z.enum(["GOOGLE", "EMAIL"]),
  password: z.string().optional(),
  profile_pic_url: z.string().optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

// ========================== RESGISTER END =====================

// ========================= LOGIN START ========================
export const loginSchema = z
  .object({
    email: z.email().optional(),
    password: z.string().optional(),
    source: z.enum(["GOOGLE", "EMAIL"]),
    google_code: z.string().optional(),
  })
  .refine(
    ({ source, password, google_code }) => {
      if (source === "EMAIL" && !password) {
        return false;
      }

      if (source === "GOOGLE" && !google_code) {
        return false;
      }
      return true;
    },
    {
      path: ["password"],
      error: "Email method should have password!",
    },
  );

export type LoginSchema = z.infer<typeof loginSchema>;
// ========================= LOGIN END ==========================

// ========================== JWT TOKEN PAYLOAD START ============================

export const jwtTokenSchema = z.object({
  user_id: z.string(),
  email: z.email(),
  active: z.boolean(),
  role: z.enum(["ADMIN", "USER"]),
});

export type JwtTokenSchema = z.infer<typeof jwtTokenSchema>;
// ========================== JWT TOKEN PAYLOAD END ============================
