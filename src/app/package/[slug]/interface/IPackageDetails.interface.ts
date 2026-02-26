import { IApiResponse } from "@/interface/apiResponse";

export interface IPackageDetailsData {
  id: string;
  name: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  destination: string;
  duration: string;
  start_point: string;
  end_point: string;
  group_size: string;
  max_altitude: string;
  previous_price: string;
  current_price: string;
  cancellation_policy: string;
  payment_policy: string;
  terms_conditions: string;
  country: string;
  category: { name: string; id: string };
  availability: string[];
  package_type: { name: string; id: string };
  city: IPackageDetailsCity[];
  highlights: IPackageDetailsHighlight[];
  gallery: IPackageDetailsGallery[];
  videos: IPackageDetailsVideo[];
  inclusions: IPackageDetailsInclusion[];
  exclusions: IPackageDetailsExclusion[];
  notices: IPackageDetailsNotice[];
  itinerary: IPackageDetailsItinerary[];
  is_top_tour: boolean;
  is_top_deals: boolean;
}

export interface IPackageDetailsCity {
  name: string;
}

export interface IPackageDetailsHighlight {
  id: string;
  package: Package;
  title: string;
  description: string;
}

export interface IPackageDetailsGallery {
  id: string;
  image: string;
}

export interface IPackageDetailsVideo {
  id: string;
  video?: string;
}

export interface IPackageDetailsInclusion {
  id: string;
  package: string;
  title: string;
  description: string;
}

export interface IPackageDetailsExclusion {
  id: string;
  package: string;
  title: string;
  description: string;
}

export interface IPackageDetailsNotice {
  id: string;
  package: string;
  title: string;
  description: string;
}

export interface IPackageDetailsItinerary {
  id: string;
  package: string;
  day: number;
  title: string;
  description: string;
  accommodation: string;
  meals: string;
  activities: string;
}

export interface IPackageDetailsImage {
  id: string;
  image: string;
}

export interface Itinerary {
  id: string;
  day: number;
  title: string;
  description: string;
  package: Package;
  images: Image[];
}

export interface Package {
  id: string;
  name: string;
}

export interface Image {
  id: string;
  image: string;
}

export type IPackageResponse = IApiResponse<IPackageDetailsData>;
