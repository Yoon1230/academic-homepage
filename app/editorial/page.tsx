import type { Metadata } from "next";
import { EditorialSite } from "../site-components";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Classic Compact Preview",
  description: "A classic compact preview of Haoyi Zhao's academic homepage.",
  robots: { index: false, follow: true },
};

export default function EditorialPage() {
  return <EditorialSite />;
}
