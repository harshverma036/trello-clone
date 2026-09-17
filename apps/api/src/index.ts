import express, { type Request, type Response } from "express";
import appConfig from "./lib/appConfig";

const app = express();

// health route
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Server is upppp!!!!!!!!!!!!",
  });
});

// starting server
app.listen(appConfig.PORT, () =>
  console.log(`Server running on port: ${appConfig.PORT}`),
);
