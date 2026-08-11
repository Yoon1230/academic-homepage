import type { Metadata } from "next";
import { SwissIndexSite } from "../site-components";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Modern Academic Preview",
  description: "A modern compact preview of Haoyi Zhao's academic homepage.",
  robots: { index: false, follow: true },
};

export default function SwissIndexPage() {
  return <SwissIndexSite />;
}
