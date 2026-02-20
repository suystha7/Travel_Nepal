import { IApiResponse } from "@/interface/apiResponse";

export interface IOrganizationData {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  google_map: string;
  disclaimer: string;
}
export type IOrganizationResponse = IApiResponse<IOrganizationData>;
