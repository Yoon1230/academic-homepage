import type { Metadata } from "next";
import { ArchiveSite } from "./site-components";

export const dynamic = "force-static";

const description =
  "Haoyi Zhao's academic homepage: time series, publications, education, honors, and academic updates.";

export const metadata: Metadata = {
  title: { absolute: "Haoyi Zhao | Academic Homepage" },
  description,
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/zh", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    title: "Haoyi Zhao | Academic Homepage",
    description,
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    images: [{ url: "/og.png", width: 1737, height: 905, alt: "Haoyi Zhao | Academic Homepage" }],
  },
  twitter: { card: "summary_large_image", title: "Haoyi Zhao | Academic Homepage", description, images: ["/og.png"] },
};

export default function Home() {
  return <ArchiveSite final locale="en" />;
}
