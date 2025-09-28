import { createClient } from "next-sanity";

// WHY: single place to configure the Sanity client used on server and client
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-08-01", // match what worked in Postman
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_READ_TOKEN || undefined,
});
