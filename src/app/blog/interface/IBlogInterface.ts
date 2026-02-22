import { IPaginatedData } from "@/interface/apiResponse";

export interface IBlogRecord {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  category: string;
  is_popular: boolean;
  like: number;
  views: number;
  blog_slug: string;
  blog_images: IBlogImage[];
  blog_seo: IBlogSeo;
  blog_image_seo: IBlogImageSeo[];
  created_at: string;
  updated_at: string;
}

export interface IBlogImage {
  id: string;
  created_at: string;
  updated_at: string;
  image: string;
  blog: string;
}

export interface IBlogSeo {
  id: string;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  image_url: string;
  image_title: string;
  image_caption: string;
  image_alt: string;
  blog: string;
}

export interface IBlogImageSeo {
  id: string;
  created_at: string;
  updated_at: string;
  image: string;
  title: string;
  caption: string;
  alt: string;
  blog: string;
}

export type IBlogResponse = IPaginatedData<IBlogRecord>;
