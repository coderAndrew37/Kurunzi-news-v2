export type SearchParams = Record<string, string | string[] | undefined>;

export async function resolveSearchParams(
  searchParams?: SearchParams | Promise<SearchParams>
): Promise<SearchParams> {
  return searchParams instanceof Promise
    ? await searchParams
    : (searchParams ?? {});
}

export function toStringParam(
  value: string | string[] | undefined
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
