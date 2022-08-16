import * as express from "express";
import DocumentController from "../Controllers/DocumentController";
import { auth } from "../Middleware/auth";
import * as validate from "../Validate/Documents"
const router = express.Router();
router.use(auth);
router.get("/", validate.queryDocument, DocumentController.getListDocument);
router.get("/:id", validate.isUUID, DocumentController.findDocumentById);
router.post("/", validate.createDocument, DocumentController.createDocument);
router.put(
  "/:id",
  validate.isUUID,
  validate.createDocument,
  DocumentController.updateDocument
);
router.patch(
  "/:id/storage",
  validate.bodyAndParamsIsUUID,
  DocumentController.deliveryToStorage
);

export default router;