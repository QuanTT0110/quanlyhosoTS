import { Staff } from "../Entities/Index";

export interface ICreateStaff {
    name: string;
    email: string;
    password: string;
    isRoot: boolean;
    active: boolean;
    departmentId: string;
    auth: Staff;
  }
  export interface ICreateCompany {
    name: string;
    address: string;
    auth: Staff;
  }
  export interface ICreateDepartment {
    name: string;
    companyId: string;
    auth: Staff;
  }
  export interface ICreateInventory {
    name: string;
    companyId: string;
    auth: Staff;
  }
  export interface ICreateCabinet {
    name: string;
    inventoryId: string;
    auth: Staff;
  }
  export interface ICreateDrawer {
    name: string;
    cabinetId: string;
    auth: Staff;
  }
  export interface ICreateDocument {
    title: string;
    content: string;
    staffId: string;
    drawerId: string;
    auth: Staff;
  }

  export interface IQueryCompany {
    limit: number;
    page: number;
    keyword: string;
    typeCompany: string;
    auth: Staff;
  }
  export interface IQueryStaff {
    limit: number;
    page: number;
    keyword: string;
    active: boolean;
    departmentId: string;
    auth: Staff;
  }
  export interface IQueryDepartment {
    limit: number;
    page: number;
    keyword: string;
    companyId: string;
  }
  export interface IQueryInventory {
    limit: number;
    page: number;
    keyword: string;
    companyId: string;
  }
  export interface IQueryCabinet {
    limit: number;
    page: number;
    keyword: string;
    inventoryId: string;
  }
  export interface IQueryDrawer {
    limit: number;
    page: number;
    keyword: string;
    cabinetId: string;
    typeCompany: string;
  }
  export interface IQueryDocument {
    limit: number;
    page: number;
    keyword: string;
    status: string | null;
    drawerId: string | null;
    createdAt: Date | string;
  }
  
  export interface ILogin {
    email: string;
    password: string;
  }
  export interface IResponse {
    data: Object;
    message: string;
  }
  export interface IStorageDeliveryDocument {
    id: string;
    drawerId: string;
  }