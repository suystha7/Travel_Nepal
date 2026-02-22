import { ISeoRecord } from "@/interface/seoResponse";
import type { Metadata } from "next";

type ImageData = {
  url: string;
};

type VideoData = {
  url: string;
  width?: number;
  height?: number;
  type?: string;
};

export function createMetadata(
  seoRecord: ISeoRecord | null,
  imagesUrls?: ImageData[] | null,
  videoData?: VideoData
): Metadata {
  const defaultImage = "https://goodTravels.com.np/logo.png";
  const defaultTitle = "Travel Nepal Pvt. Ltd.";
  const defaultDescription =
    "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const defaultUrl = "https://goodTravels.com.np";

  return {
    title: seoRecord?.meta_title ?? defaultTitle,
    description: seoRecord?.meta_description ?? defaultDescription,
    openGraph: {
      title: seoRecord?.og_title ?? seoRecord?.meta_title ?? defaultTitle,
      description:
        seoRecord?.og_description ??
        seoRecord?.meta_description ??
        defaultDescription,
      url: seoRecord?.og_url ?? seoRecord?.canonical_url ?? defaultUrl,
      siteName: "Travel Nepal Pvt. Ltd.",
      images: imagesUrls
        ? imagesUrls.map((img) => ({ url: img.url, width: 800, height: 600 }))
        : [
            {
              url: seoRecord?.og_image ?? defaultImage,
              width: 800,
              height: 600,
            },
          ],
      videos: videoData
        ? [
            {
              url: videoData.url,
              width: videoData.width || 1280,
              height: videoData.height || 720,
              type: videoData.type || "video/mp4",
            },
          ]
        : undefined,
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: seoRecord?.canonical_url ?? defaultUrl,
      languages: { "en-US": "/en-US" },
    },
  };
}
