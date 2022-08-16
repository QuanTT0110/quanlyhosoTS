import DocumentDAO from "../DAO/DocumentsDAO";
import { ICreateDocument, IQueryDocument, IStorageDeliveryDocument } from "../Models/models";
import responseMsg from "../Message";

export default class DocumentService {
    static createDocument = async (document: ICreateDocument) => {
        const result = await DocumentDAO.createDocument(document);
        if(!result) return { data: null, message: responseMsg.CREATE_ERROR };
        return { data: result, message: responseMsg.CREATE_SUCCESS };
    };

    static updateDocument = async (document: ICreateDocument, id: string) => {
        const result = await DocumentDAO.updateDocument(document,id);
        if(!result) return { data: null, message: responseMsg.UPDATE_ERROR };
        return { data: result, message: responseMsg.UPDATE_SUCCESS };
    };

    static findDocumentById = async (id: string) => {
        const result = await DocumentDAO.findDocumentById(id);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    };

    static getListDocument = async (query: IQueryDocument) => {
        const result = await DocumentDAO.getListDocument(query);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND};
        return { data: result, message: responseMsg.SUCCESS };
    };

    static deliveryToStorage = async (params : IStorageDeliveryDocument) => {
        const result = await DocumentDAO.deliveryToStorage(params);
        if (!result) return { data: null, message: responseMsg.UPDATE_STATUS_ERROR };
        return { data: result, message: responseMsg.UPDATE_SUCCESS };
    }
}