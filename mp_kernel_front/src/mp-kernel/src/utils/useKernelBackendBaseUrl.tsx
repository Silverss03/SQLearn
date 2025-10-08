export function useKernelBackendBaseUrl(): string {
  return (
    import.meta.env.VITE_KERNEL_BACKEND_BASE_URL || 'http://localhost:5100'
  );
}
