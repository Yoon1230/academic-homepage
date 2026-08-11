import type { Metadata } from "next";
import { ArchiveSite } from "../site-components";

export const dynamic = "force-static";

const description =
  "赵豪宜的学术主页：时间序列、代表性论文、教育经历、荣誉与最新动态。";

export const metadata: Metadata = {
  title: { absolute: "赵豪宜｜学术主页" },
  description,
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/",
      "zh-CN": "/zh",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    title: "赵豪宜｜学术主页",
    description,
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og.png",
        width: 1737,
        height: 905,
        alt: "赵豪宜——时间序列",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "赵豪宜｜学术主页",
    description,
    images: ["/og.png"],
  },
};

export default function ChineseHomepage() {
  return <ArchiveSite final locale="zh" />;
}
