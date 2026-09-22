//client\src\api\apiClient.ts

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

type ApiOptions = RequestInit & {
  skipJson?: boolean;
};

export const apiClient = async <T>(
  path: string,
  options: ApiOptions = {}
): Promise<T> => {
  const { skipJson, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message ?? "API request failed");
  }

  if (skipJson) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};