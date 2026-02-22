import { IPaginatedData } from "@/interface/apiResponse";

export interface IPolicyRecord {
  id: string;
  created_at: string;
  updated_at: string;
  policy_type: string;
  title: string;
  description: string;
}

export type IPolicyData = IPaginatedData<IPolicyRecord>;
