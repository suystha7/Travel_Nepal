// Generic API Response
export interface IApiResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data: IPaginatedData<T>;
}

// Generic paginated data wrapper
export interface IPaginatedData<T> {
  records: T[];
  totalRecords: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevious: boolean;
  hasNext: boolean;
  prev: string;
  next: string;
  recordShown: number;
}
