import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/ntm-quiz-2026-v1",
};

export default nextConfig;
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
