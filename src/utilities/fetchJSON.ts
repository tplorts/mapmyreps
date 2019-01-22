export async function fetchJSON<T = any>(url: string) {
  const response = await fetch(url);

  return (await response.json()) as T;
}
