import * as express from "express";
import * as validate from "../Validate/Companies";
import {auth} from "../Middleware/auth";
import CompanyController from "../Controllers/CompaniesController";

const router = express.Router();

router.use(auth);
router.get("/", validate.queryCompany, CompanyController.getListCompany);
router.get("/:id", validate.isUUID, CompanyController.findCompanyById);
router.post("/", validate.createCompany, CompanyController.createCompany);
router.put(
    "/:id",
    validate.isUUID,
    validate.createCompany,
    CompanyController.updateCompany
);
  
  export default router;