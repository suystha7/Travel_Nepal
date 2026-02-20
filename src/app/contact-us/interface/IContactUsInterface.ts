import { IPaginatedData } from "@/interface/apiResponse";

export interface IFAQRecord {
  id: string;
  created_at: string;
  updated_at: string;
  question: string;
  answer: string;
}
export type FAQDataResponse = IPaginatedData<IFAQRecord>;
