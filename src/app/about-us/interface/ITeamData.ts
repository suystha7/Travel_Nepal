import { IPaginatedData } from "@/interface/apiResponse";

export interface ITeamRecord {
  id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  name: string;
  role: string;
  bio: string;
  photo: string;
}
export type TeamDataResponse = IPaginatedData<ITeamRecord>;
