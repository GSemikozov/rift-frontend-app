import { API_CONFIG } from '@shared/config';
import type { ApiError, ApiResponse } from './types';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/$/, '');

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw {
      message: `Invalid JSON response: ${text.substring(0, 100)}`,
      code: 'PARSE_ERROR',
      details: { text, status: response.status, statusText: response.statusText },
    } as ApiError;
  }
}

function createTimeoutPromise(timeoutMs: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(
      () =>
        reject({
          message: `Request timeout after ${timeoutMs}ms`,
          code: 'TIMEOUT',
          details: { timeout: timeoutMs },
        } as ApiError),
      timeoutMs
    );
  });
}

async function fetchApi<T>(endpoint: string, options?: FetchOptions): Promise<ApiResponse<T>> {
  const baseUrl = API_CONFIG.BASE_URL ? normalizeBaseUrl(API_CONFIG.BASE_URL) : '';
  let url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  if (options?.params) {
    const queryString = new URLSearchParams(
      Object.entries(options.params).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null) acc[key] = String(value);
          return acc;
        },
        {} as Record<string, string>
      )
    ).toString();
    if (queryString) url += `?${queryString}`;
  }

  const headers: Record<string, string> = { ...(options?.headers as Record<string, string>) };
  if (!(options?.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const fetchPromise = fetch(url, { ...options, headers });
  const response = (await Promise.race([
    fetchPromise,
    createTimeoutPromise(API_CONFIG.TIMEOUT),
  ])) as Response;

  if (!response.ok) {
    let errBody: { detail?: string } = {};
    try {
      errBody = await parseJsonResponse<{ detail?: string }>(response);
    } catch {
      // non-JSON error body, ignore
    }
    throw {
      message: errBody?.detail || `Request failed: ${response.status} ${response.statusText}`,
      code: `HTTP_${response.status}`,
      details: { status: response.status, statusText: response.statusText, url },
    } as ApiError;
  }

  const data = await parseJsonResponse<T>(response);
  if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
    return data as unknown as ApiResponse<T>;
  }
  return { data: data as T, success: true };
}

export const apiClient = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),
};
