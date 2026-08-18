import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getCampaigns, getServices } from "@/lib/wordpress/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  let serviceEntries: MetadataRoute.Sitemap = [];
  let campaignEntries: MetadataRoute.Sitemap = [];

  try {
    const [services, campaigns] = await Promise.all([
      getServices(),
      getCampaigns(),
    ]);

    serviceEntries = services.services.nodes.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    campaignEntries = campaigns.campaigns.nodes.map((campaign) => ({
      url: `${base}/campaigns/${campaign.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // Sitemap still returns core routes if WordPress is down.
  }

  return [...staticEntries, ...serviceEntries, ...campaignEntries];
}
