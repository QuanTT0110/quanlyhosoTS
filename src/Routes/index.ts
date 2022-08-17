import * as express from "express";
import commonRouter from "./common";
import StaffsRoute from "./staffs"
import DepartmentsRoute from "./departments";
import CompaniesRoute from "./companies";
import DrawersRoute from "./drawers";
import DocumentsRoute from "./documents";
import { Request, Response, NextFunction } from "express";
import AppError from "../middleware/app-error";

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