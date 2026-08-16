import type { MetadataRoute } from "next";
import { ROUTES } from "@/src/constants/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES;
}
