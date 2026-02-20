import { IApiResponse } from "@/interface/apiResponse";

export interface IAboutUsData {
  id: string;
  title: string;
  sub_title: string;
  description: string;
  stats: IAboutUsStats;
  who_we_are: IAboutUsWhoWeAre;
  created_at: string;
  updated_at: string;
}

export interface IAboutUsStats {
  id: string;
  title: string;
  description: string;
  year_experience: number;
  happy_travellers: number;
  travel_history: number;
  total_packages: number;
}

export interface IAboutUsWhoWeAre {
  id: string;
  title: string;
  description: string;
  images: string[];
}
export interface IAboutUsMissionVision {
  id: string;
  heading: string;
  mission: string;
  vision: string;
  sub_text: string;
}
export interface IAboutUsWhyUS {
  id: string;
  heading: string;
  sub_heading: string;
  listItems: {
    title: string;
    ordering: string;
    description: string;
  };
}

export type AboutUsResponse = IApiResponse<IAboutUsData>;
