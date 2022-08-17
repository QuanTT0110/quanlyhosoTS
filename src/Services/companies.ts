import CompanyDAO from "../dao/companies";
import { ICreateCompany, IQueryCompany } from "../models/models";
import responseMsg from "../Message";

export default class CompanyService {
    static createCompany = async (company: ICreateCompany) => {
        const result = await CompanyDAO.createCompany(company);
        if(!result) return { data: null, message: responseMsg.CREATE_ERROR };
        return { data: result, message: responseMsg.CREATE_SUCCESS };
    };

    static updateCompany = async (company: ICreateCompany, id: string) => {
        const result = await CompanyDAO.updateCompany(company,id) ;
        if(!result) return { data: null, message: responseMsg.UPDATE_ERROR };
        return { data: result, message: responseMsg.UPDATE_SUCCESS };
    };

    static findCompanyById = async (id: string) => {
        const result = await CompanyDAO.findCompanyById(id);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND };
        return { data: result, message: responseMsg.SUCCESS };
    };

    static getListCompany = async (query: IQueryCompany) => {
        const result = await CompanyDAO.getListCompany(query);
        if(!result) return { data: null, message: responseMsg.NOT_FOUND };
        return { data: result, message: responseMsg.SUCCESS };
    };
}
