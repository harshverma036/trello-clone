import "dotenv/config";

type NODE_ENV = "development" | "production";

interface iAppConfig {
  PORT: number;
  NODE_ENV: NODE_ENV;
  JWT_SECRET_KEY: string;
}

const appConfig: iAppConfig = {
  PORT: +process.env.PORT! || 6900,
  NODE_ENV: (process.env.NODE_ENV! as NODE_ENV) || "development",
  JWT_SECRET_KEY:
    (process.env.JET_SECRET_KEY! as string) || "mwakefnb7823gfjhbasdfnhj",
};

export default appConfig;
