import "dotenv/config";

type NODE_ENV = "development" | "production";

interface iAppConfig {
  PORT: number;
  NODE_ENV: NODE_ENV;
}

const appConfig: iAppConfig = {
  PORT: +process.env.PORT! || 6900,
  NODE_ENV: (process.env.NODE_ENV! as NODE_ENV) || "development",
};

export default appConfig;