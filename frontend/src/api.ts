import type { Project } from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8080/api';

type ApiOptions = RequestInit;

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.message ?? 'Request failed');
  }
  return payload as T;
}

export const api = {
  projects: () => request<Project[]>('/projects'),
  project: (slug: string) => request<Project>(`/projects/${slug}`),
  contact: (data: Record<string, unknown>) =>
    request<{ message: string }>('/contact', { method: 'POST', body: JSON.stringify(data) }),
  careers: (data: Record<string, unknown>) =>
    request<{ message: string }>('/careers', { method: 'POST', body: JSON.stringify(data) }),
};
