interface ExtractedError {
  message: string;
  code: string;
  details?: string | null;
  hint?: string | null;
  raw?: unknown;
}

interface SupabaseErrorLike {
  message?: string;
  code?: string;
  details?: string | null;
  hint?: string | null;
}

const isSupabaseError = (e: unknown): e is SupabaseErrorLike =>
  typeof e === "object" && e !== null && "message" in e;

export function extractErrorDetails(error: unknown): ExtractedError {
  if (!error) {
    return { message: "Unknown error", code: "UNKNOWN" };
  }

  if (typeof error === "string") {
    return { message: error, code: "STRING_ERROR" };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: "JS_ERROR",
      raw: error,
    };
  }

  if (isSupabaseError(error)) {
    return {
      message: error.message ?? "Supabase error",
      code: error.code ?? "SUPABASE_UNKNOWN",
      details: error.details ?? null,
      hint: error.hint ?? null,
      raw: error,
    };
  }

  try {
    return {
      message: JSON.stringify(error),
      code: "SERIALIZED_ERROR",
      raw: error,
    };
  } catch {
    return {
      message: "Unserializable error object",
      code: "UNSERIALIZABLE",
      raw: error,
    };
  }
}
