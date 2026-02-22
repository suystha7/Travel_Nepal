import { IApiResponse } from "./apiResponse";

export interface ISeoRecord {
  id: string;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_image: string;
  canonical_url: string;
  robots: string;
  structured_data: string;
  custom_header: string;
  seo_for: string;
}
export type ISeoResponse = IApiResponse<ISeoRecord>;
