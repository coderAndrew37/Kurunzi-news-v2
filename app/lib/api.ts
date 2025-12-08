// lib/api.ts
import axios from "axios";
import { RawSanityArticle, Story } from "../components/types";

export interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  stories?: RawSanityArticle[];
}

export interface AppCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  stories: Story[]; // processed stories
}

export async function fetchCategories(page: number): Promise<SanityCategory[]> {
  const res = await axios.get(`/api/categories?page=${page}`);
  return res.data;
}
