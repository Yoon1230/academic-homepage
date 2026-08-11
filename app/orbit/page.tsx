import type { Metadata } from "next";
import { OrbitSite } from "../site-components";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Research Teal Preview",
  description: "A teal research-report preview of Haoyi Zhao's academic homepage.",
  robots: { index: false, follow: true },
};

export default function OrbitPage() {
  return <OrbitSite />;
}
