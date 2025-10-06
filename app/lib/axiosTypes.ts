import { AxiosError } from "axios";

export interface ApiErrorResponse {
  error?: string;
  message?: string;
  status?: number;
}

export type AxiosApiError = AxiosError<ApiErrorResponse>;
