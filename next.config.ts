import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  assetPrefix: isGitHubPagesBuild ? "/academic-homepage" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
