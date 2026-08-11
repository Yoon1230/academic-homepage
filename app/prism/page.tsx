import type { Metadata } from "next";
import { PrismSite } from "../site-components";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "PRISM-Inspired Preview",
  description: "A PRISM-inspired academic homepage layout for Haoyi Zhao.",
  robots: { index: false, follow: true },
};

export default function PrismPage() {
  return <PrismSite />;
}
