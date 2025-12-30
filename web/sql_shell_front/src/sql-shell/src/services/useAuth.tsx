import { useCallback, useState } from 'react';

export function useApiAuth() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || ''
  );

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setAccessToken(data.accessToken);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken('');
  }, []);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;
    try {
      const res = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) throw new Error('Refresh token failed');
      const data = await res.json();
      localStorage.setItem('accessToken', data.accessToken);
      if (data.refreshToken)
        localStorage.setItem('refreshToken', data.refreshToken);
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      console.error(err);
      logout();
      return null;
    }
  }, [logout]);

  return { accessToken, login, logout, refreshToken };
}
