// lib/api.ts
import axios from "axios";
import { RawSanityArticle } from "../components/types";

export interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  stories?: RawSanityArticle[];
}

export async function fetchCategories(page: number): Promise<SanityCategory[]> {
  const res = await axios.get(`/api/categories?page=${page}`);
  return res.data;
}
