export async function apiFetch(path, options = {}) {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}
