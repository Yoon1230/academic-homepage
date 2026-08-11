import type { Metadata } from "next";
import { LabGridSite } from "../site-components";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Scholar Blue Preview",
  description: "An institutional blue preview of Haoyi Zhao's academic homepage.",
  robots: { index: false, follow: true },
};

export default function LabGridPage() {
  return <LabGridSite />;
}
