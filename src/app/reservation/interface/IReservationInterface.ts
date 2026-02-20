import { IApiResponse } from "@/interface/apiResponse";

export interface IReservationRoot {
  status: string;
  statusCode: number;
  message: string;
  data: IReservationData;
}

export interface IReservationData {
  records: IReservationRecord[];
  totalRecords: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevious: boolean;
  hasNext: boolean;
  prev: number;
  next: number;
  recordShown: number;
}

export interface IReservationRecord {
  id: string;
  created_at: string;
  updated_at: string;
  type: string;
  description: string;
}

export type IReservationResponse = IApiResponse<IReservationRecord>;
