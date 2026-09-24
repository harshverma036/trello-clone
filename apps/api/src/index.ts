import express, { type NextFunction, type Request, type Response } from "express";
import appConfig from "./lib/appConfig";
import applicationRouter from "./modules/routes";
import cors from "cors";
import { AppError } from "./lib/appError";

const app = express();

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  cors({
    origin: ["http://localhost:6901"],
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

// error middleware
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      success: false,
      error: {
        message: err.message,
        details: err.details,
      },
    });
  }

  console.error(err);

  res.status(500).json({
    success: false,
    error: {
      message: "Something went wrong",
    },
  });
});

// starting server
app.listen(appConfig.PORT, () =>
  console.log(`Server running on port: ${appConfig.PORT}`),
);
