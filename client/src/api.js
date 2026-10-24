export function apiUrl(path) {
  return `/api${path}`;
}

export async function api(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Unable to reach the server. Please try again.');
  return data;
}
