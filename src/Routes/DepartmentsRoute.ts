import * as express from "express";
import DepartmentController from "../Controllers/DepartmentsController";
import { auth } from "../Middleware/auth";
import * as validate from "../Validate/Departments"
const router = express.Router();
router.use(auth);
router.get("/", validate.queryDepartment, DepartmentController.getListDepartment);
router.get("/:id", validate.isUUID, DepartmentController.findDepartmentById);
router.post(
  "/",
  validate.createDepartment,
  DepartmentController.createDepartment
);
router.put(
  "/:id",
  validate.isUUID,
  validate.createDepartment,
  DepartmentController.updateDepartment
);

export default router;