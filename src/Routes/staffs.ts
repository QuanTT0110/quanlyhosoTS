import * as express from "express";
import StaffController from "../controllers/staffs";
import { auth } from "../middleware/auth";
import * as validate from "../validate/staffs";
const router = express.Router();
// router.use(auth);
router.get("/", validate.queryStaff, StaffController.getListStaff);
router.get("/:id", validate.isUUID, StaffController.findStaffById);
router.post("/", validate.createStaff, StaffController.createStaff);
router.put(
  "/:id",
  validate.isUUID,
  validate.createStaff,
  StaffController.updateStaff
);
router.patch("/:id/active", validate.isUUID, StaffController.changeActive);

export default router;