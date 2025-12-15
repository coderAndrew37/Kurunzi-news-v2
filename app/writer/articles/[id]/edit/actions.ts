"use server";

import { sanityClient } from "@/app/lib/sanity.client";

export async function getCategories() {
  return sanityClient.fetch(`*[_type == "category"]{_id, title}`);
}
