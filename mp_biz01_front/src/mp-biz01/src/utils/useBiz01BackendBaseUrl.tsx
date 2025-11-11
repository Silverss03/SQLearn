export function useBiz01BackendBaseUrl(): string {
  return import.meta.env.VITE_BIZ01_BACKEND_BASE_URL || 'http://localhost:5101';
}
