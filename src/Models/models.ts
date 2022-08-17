import Staff from "../entities/staff";

export interface ICreateStaff {
  name: string;
  email: string;
  password: string;
  isRoot: boolean;
  active: boolean;
  departmentId: string;
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