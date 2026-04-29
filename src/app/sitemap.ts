import type { MetadataRoute } from "next"
import { PROJECTS } from "@/lib/data/projects"
import { BASE_URL } from "@/lib/site"

/**
 * Purpose:
 *   Generates /sitemap.xml at build time. Includes the home page, all
 *   project detail pages, and the blog index (when populated).
 *   robots.txt already points search engines here.
 *
 * Returns:
 *   MetadataRoute.Sitemap — array of URL entries consumed by Next.js.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const projectEntries: MetadataRoute.Sitemap = PROJECTS.filter((p) => p.hasDetailPage).map(
        (p) => ({
            url: `${BASE_URL}/projects/${p.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        })
    )

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
        },
        ...projectEntries,
    ]
}
