import { useState } from 'react';
import { FetchRequestConfig, HTTP_METHODS } from '../types/student';

export const useFetch = <T = any, P = void>(
  config: FetchRequestConfig,
  onSuccess?: () => void
) => {
  const [data, setData] = useState<T>(
    (Array.isArray([] as T) ? [] : null) as T
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (payload?: P) => {
    setIsLoading(true);
    setError(null);
    try {
      const baseUrl = '/api';
      const options: RequestInit = {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (
        options.method === HTTP_METHODS.POST ||
        options.method === HTTP_METHODS.PUT
      ) {
        options.body = JSON.stringify(payload);
      }
      const response = await fetch(`${baseUrl}/${config.url}`, options);
      const json = await response.json();
      if (!response.ok) {
        throw new Error((json as { error?: string }).error ?? 'Request Failed');
      }
      setData(json);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'unknown error');
    } finally {
      setIsLoading(false);
    }
  };
  return { data, isLoading, error, fetchData };
};
