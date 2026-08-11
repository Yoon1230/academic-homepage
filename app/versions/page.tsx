import type { Metadata } from "next";
import { Gallery } from "../site-components";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Design Archive",
  description: "Six local design previews for Haoyi Zhao's academic homepage.",
  robots: { index: false, follow: true },
};

export default function VersionsPage() {
  return <Gallery />;
}
