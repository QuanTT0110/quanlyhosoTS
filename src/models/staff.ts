import Staff from "../entities/staff";

export interface IStaffCreatePayload {
  name: string;
  email: string;
  password: string;
  isRoot: boolean;
  active: boolean;
  departmentId: string;
  auth: Staff;
}

export interface IStaffQueryAll {
  limit: number;
  page: number;
  keyword: string;
  active: boolean;
  departmentId: string;
  auth: Staff;
}

export interface IResponse {
  data: Object;
  message: string;
}
