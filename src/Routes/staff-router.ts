import * as express from "express";
import controllers from "../Controllers";
import { auth } from "../Middleware/auth";
import * as validate from "../Validation/staff-validation"
const router = express.Router();
// router.use(auth);
router.get("/:id", validate.isUUID, controllers.Staff.findById);
router.get("/", validate.queryStaff, controllers.Staff.getList);
router.post("/", validate.createStaff, controllers.Staff.create);
router.put("/:id",validate.isUUID,validate.createStaff,controllers.Staff.update);

export default router;