import staffRouter from "./staff";
import { Request, Response, NextFunction, Express } from "express";
import AppError from "../middleware/app-error";

const router = (app: Express) => {
  app.use("/", staffRouter);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const error = new AppError(404, "The route not found");
    return next(error);
  });
};

export default router;
