import "dotenv/config";
// export and able to use db instance overall the api application.
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const NODE_ENV = `${process.env.NODE_ENV}`;

const adapter = new PrismaPg({
  connectionString,
});

const log: any = ["error", "warn"];

if (NODE_ENV === "development") {
  log.push("query");
}

const db = new PrismaClient({
  adapter,
  log,
  errorFormat: "pretty",
});

export default db;
