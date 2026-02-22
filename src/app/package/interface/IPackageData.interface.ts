import { IApiResponse } from "@/interface/apiResponse";

export interface IPackageRecord {
  id: string;
  country: { name: string; slug: string };
  city: string;
  ordering: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  main_image: string;
  current_price: string;
  previous_price: string;
  destination: string;
  duration: string;
  start_point: string;
  end_point: string;
  group_size: string;
  season: string;
  meals: string;
  package_type: {slug: string; name: string};
  accommodations: string;
  activity_duration: string;
  max_altitude: string;
  youtubeUrl: string;
  mapUrl: string;
  pdfManual: string;
  faqs: IPackageFaq[];
  highlights: string[];
  gallery: string[];
  videos: string[];
  availability_month: string[];
  inclusions: IPackageInclusion[];
  exclusions: IPackageExclusion[];
  notices: IPackageNotice[];
  dates: IPackageDate[];
  itinerary: IPackageItinerary[];
  equipment: string;
  is_top_tour: boolean;
  is_top_deals: boolean;
  total_reviews: number;
  average_rating: number;
}

export interface IPackageItinerary {
  id: string;
  day: number;
  title: string;
  description: string;
}

export interface IPackageFaq {
  id: string;
  ordering: number;
  question: string;
  answer: string;
}

export interface IPackageInclusion {
  id: string;
  ordering: number;
  detail: string;
}

export interface IPackageExclusion {
  id: string;
  ordering: number;
  detail: string;
}

export interface IPackageNotice {
  id: string;
  title: string;
  description: string;
}

export interface IPackageDate {
  id: string;
  start_date: string;
  end_date: string;
}
export type IPackageResponse = IApiResponse<IPackageRecord[]>;
