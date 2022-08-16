import { Document, Drawer } from "../Entities/Index";
import { ICreateDocument, IQueryDocument, IStorageDeliveryDocument } from "../Models/models";
import { AppDataSource } from "../data-source";
import DrawerDAO from "./DrawersDAO";
import StaffDAO from "./StaffsDAO";

const documentDAO = AppDataSource.getRepository(Document);

export default class DocumentDAO {
    static findDocumentById = async (id: string): Promise<Document | null> => {
        const result = await documentDAO.findOne({
            where: { id: id },
            relations: { staff: true, drawer: true },
        });
        if (!result) return null;
        return result;
    };

    static getListDocument = async (query: IQueryDocument): Promise<Document[]> => {
        const limit = query.limit ? Math.floor(query.limit) : 20;
        const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
        const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
        const queryString = await documentDAO
            .createQueryBuilder("Document")
            .innerJoinAndSelect("Document.staff", "Staff")
            .innerJoinAndSelect("Document.drawer", "Drawer")
            .where("Document.title LIKE = :title", { title: keyword });
        if (query.status) {
            await queryString.andWhere("Document.status = :status", {
                status: query.status
            })
        }
        if (query.drawerId) await queryString.andWhere("Drawer.id = :id", {
            id: query.drawerId
        })
        if (query.createdAt) {
            const before = new Date(query.createdAt);
            const after = new Date(new Date(query.createdAt).getTime() + 24 * 60 * 60 * 1000);
            await queryString.andWhere("Document.createdAt > :before", { before })
                .andWhere("Document.updatedAt < :after", { after })
        }
        return await queryString.limit(limit).offset(skip).getMany();
    };

    static createDocument = async (document: ICreateDocument): Promise<Document | null> => {
        const staff = await StaffDAO.findStaffById(document.staffId);
        const drawer = await DrawerDAO.findDrawerById(document.drawerId);
        if (!staff || !drawer) {
            return null;
        }
        const createDocument = await documentDAO.save(
            documentDAO.create({
              ...document,
              staff,
              drawer,
              status: "waiting",
            })
          );
          return createDocument;
    };

    static updateDocument = async (document : ICreateDocument, id: string): Promise<Document | null> => {
        const staff = await StaffDAO.findStaffById(document.staffId);
        const drawer = await DrawerDAO.findDrawerById(document.drawerId);
        const updateDocument = await this.findDocumentById(id);
        if(!updateDocument || !staff || !drawer) return null;
        return await documentDAO.save(Object.assign(updateDocument,{...document,staff: staff,drawer: drawer}));
    };

    static deliveryToStorage = async (params : IStorageDeliveryDocument): Promise<Document | null> => {
        const updateDocument = await this.findDocumentById(params.id);
        const drawer: Drawer | null = await DrawerDAO.findDrawerById(params.drawerId);
        if(!updateDocument || !drawer) return null;
        return await documentDAO.save(Object.assign(updateDocument, {drawer: drawer, status: "stored"}));
    }
}