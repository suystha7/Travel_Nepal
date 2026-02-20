import { IApiResponse, IPaginatedData } from "@/interface/apiResponse";

export interface IHeroRecord {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  image: IHeroImage[];
  video: IHeroVideo;
  created_at: string;
  updated_at: string;
}

export interface IHeroImage {
  id: string;
  image: string;
}

export interface IHeroVideo {
  id: string;
  video: string;
}
export type IHeroData = IPaginatedData<IHeroRecord>[];
export type IHeroApiResponse = IApiResponse<IHeroData>;
