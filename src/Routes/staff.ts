import * as express from "express";
import controllers from "../controllers";
import { auth } from "../middleware/auth";
import validate from "../validation/";

const router = express.Router();

// router.use(auth);
router.get("/:id", validate.Staff.isUUID, controllers.Staff.findById);
router.get("/", validate.Staff.queryStaff, controllers.Staff.all);
router.post("/", validate.Staff.createStaff, controllers.Staff.create);
router.put(
  "/:id",
  validate.Staff.isUUID,
  validate.Staff.createStaff,
  controllers.Staff.update
);

export default router;
