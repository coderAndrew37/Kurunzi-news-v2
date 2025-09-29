// sanity.server.ts
import { createClient } from "next-sanity";

console.log("🔍 Sanity server env", {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  hasToken: !!process.env.SANITY_READ_TOKEN,
  nodeEnv: process.env.NODE_ENV,
});

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-08-01",
  token: process.env.SANITY_READ_TOKEN,
  useCdn: false,
});
