import * as express from "express";
import commonRouter from "./CommonRoute";
import StaffsRoute from "./StaffsRoute"
import DepartmentsRoute from "./DepartmentsRoute";
import CompaniesRoute from "./CompaniesRoute";
import DrawersRoute from "./DrawersRoute";
import DocumentsRoute from "./DocumentsRoute";
import { Request, Response, NextFunction } from "express";
import AppError from "../Middleware/AppError";

const router = express.Router();
router.use("/", commonRouter);
router.use("/staff", StaffsRoute);
router.use("/department", DepartmentsRoute);
router.use("/company", CompaniesRoute);
router.use("/drawer", DrawersRoute);
router.use("/document", DocumentsRoute);
router.all("*", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const error = new AppError(404, "The route not found");
  return next(error);
});
export default router;