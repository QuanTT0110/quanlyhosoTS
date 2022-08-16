import DocumentService from "../Services/DocumentsService";
import { ICreateDocument, IQueryDocument, IStorageDeliveryDocument } from "../Models/models";
import { Request, Response, NextFunction } from "express";
import responseMsg from "../Message";
import * as response from "../Response";

export default class DocumentController {
    static createDocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const document : ICreateDocument = req.body as ICreateDocument;
            const result = await DocumentService.createDocument(document);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static updateDocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!res.locals.auth || !res.locals.auth.isRoot) {
                return response.r401(res, responseMsg.DENIED_ACCESS); 
            }
            const document : ICreateDocument = req.body as ICreateDocument;
            const result = await DocumentService.updateDocument(document, req.params.id);
            if(!result.data) return response.r400(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static findDocumentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await DocumentService.findDocumentById(req.params.id);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static getListDocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: IQueryDocument = req.query as never;
            const result = await DocumentService.getListDocument(query)
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    };

    static deliveryToStorage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params : IStorageDeliveryDocument = {
                drawerId: req.body.drawerId,
                id: req.params.id
            } as IStorageDeliveryDocument;
            const result = await DocumentService.deliveryToStorage(params);
            if(!result.data) return response.r404(res, result.message)
            return response.r200(res, result.data, result.message)
        } catch (error) {
            next(error);
        }
    }
}