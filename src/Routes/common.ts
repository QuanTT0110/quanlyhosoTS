import * as express from "express";
import * as validate from "../validate/common";
import {auth} from "../middleware/auth";
import CommonController from "../controllers/common";

const router = express.Router();

router.post("/login",validate.login,CommonController.login);
router.get("/me",auth,CommonController.getStaff);

export default router;