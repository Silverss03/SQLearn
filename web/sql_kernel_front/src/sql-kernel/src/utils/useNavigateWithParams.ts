import { useNavigate } from 'react-router-dom';

export function useNavigateWithParams() {
  const navigate = useNavigate();

  const navigateWithParams = (
    path: string,
    params: Record<string, string | number | boolean | null | undefined>
  ) => {
    const url = new URL(path, window.location.origin);
    const searchParams = new URLSearchParams(url.search);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && !Number.isNaN(value)) {
        searchParams.set(key, String(value));
      }
    });

    const finalUrl = `${url.pathname}${
      searchParams.toString() ? `?${searchParams.toString()}` : ''
    }`;
    navigate(finalUrl);
  };

  return navigateWithParams;
}
