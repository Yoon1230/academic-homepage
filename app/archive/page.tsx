import type { Metadata } from "next";
import { ArchiveSite } from "../site-components";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Journal Serif Preview",
  description: "The selected journal-inspired version of Haoyi Zhao's academic homepage.",
  robots: { index: false, follow: true },
};

export default function ArchivePage() {
  return <ArchiveSite />;
}
