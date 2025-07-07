import { useMemo } from 'react';

export const useApi = () => {
  const apiBaseUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      // Server-side: sempre usa /api
      return '/api';
    }

    // Client-side: detecta se está no localhost
    return window.location.hostname === 'localhost'
      ? 'http://localhost:3001/api'
      : '/api';
  }, []);

  return { apiBaseUrl };
};
