// hooks/useFetch.ts
import { useState } from 'react';
import { FetchRequestConfig } from '../types/student';

// 泛型 T：data 的类型；P：fetchData 接收的参数类型（默认空对象）
export const useFetch = <T = any, P = void>(
  config: FetchRequestConfig,
  onSuccess?: () => void // 成功后回调（比如刷新列表）
) => {
  const [data, setData] = useState<T>(
    // 若 T 是数组，初始值为 []；否则为 null
    (Array.isArray([] as T) ? [] : null) as T
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetchData：参数类型为 P，返回 Promise
  const fetchData = async (payload?: P) => {
    setIsLoading(true);
    setError(null);
    try {
      const baseUrl = '/api'; // 补充实际地址
      const options: RequestInit = {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // post/put 请求需要传 body
      if (config.method === 'post' || config.method === 'put') {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(`${baseUrl}/${config.url}`, options);
      if (!response.ok) {
        const json = await response.json();
        // 错误处理：之前讲的空值合并
        throw new Error((json as { error?: string }).error ?? '请求失败');
      }

      const result = await response.json();
      console.log(result);
      setData(result);
      // 成功后执行回调（比如刷新列表）
      if (onSuccess) onSuccess();
      return result;
    } catch (err) {
      // 错误类型判断（之前讲的三元运算符）
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
};
