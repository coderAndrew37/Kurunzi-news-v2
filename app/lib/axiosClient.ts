// app/lib/axiosClient.ts
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "", // or leave blank for relative routes
  headers: {
    "Content-Type": "application/json",
  },
});
