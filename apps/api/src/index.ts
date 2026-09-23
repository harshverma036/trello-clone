import express, { type Request, type Response } from "express";
import appConfig from "./lib/appConfig";
import applicationRouter from "./modules/routes";
import cors from "cors";

const app = express();

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  cors({
    origin: ["htto://localhost:6901"],
  }),
);

// health route
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Server is upppp!!!!!!!!!!!!",
  });
});

// application router
app.use("/api", applicationRouter);

// starting server
app.listen(appConfig.PORT, () =>
  console.log(`Server running on port: ${appConfig.PORT}`),
);
