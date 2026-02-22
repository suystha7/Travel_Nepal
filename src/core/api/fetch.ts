import qs from "qs";
import { BASE_API_URL } from "./endpoints";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const getData = async <T = any>(
  url: string,
  params?: Record<string, any>,
  options?: {
    timeout?: number;
    tags: string[];
  }
): Promise<T> => {
  const timeout = options?.timeout ?? 30000;

  const timeoutId = setTimeout(() => {}, timeout);

  try {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    const queryString = params
      ? `?${qs.stringify(params, { arrayFormat: "repeat" })}`
      : "";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (accessToken && accessToken != undefined) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_API_URL}${url}${queryString}`, {
      method: "GET",
      headers,
      next: {
        tags: options?.tags ?? [],
        revalidate: 1,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.error(`Request to ${url} timed out after ${timeout}ms`);
    } else {
      console.error(`Request failed to ${url}:`, error);
    }
    throw error;
  }
};

export const getStaticData = async <T = any>(
  url: string,
  params?: Record<string, any>,
  options?: {
    timeout?: number;
    tags?: string[];
  }
): Promise<T> => {
  // console.log(url);
  const timeout = options?.timeout ?? 30000;
  const timeoutId = setTimeout(() => {}, timeout);
  try {
    const queryString = params
      ? `?${qs.stringify(params, { arrayFormat: "repeat" })}`
      : "";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const response = await fetch(`${BASE_API_URL}${url}${queryString}`, {
      method: "GET",
      headers,
      next: {
        tags: options?.tags ?? [],
        revalidate: 3600,
      },
    });

    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.error(`Request to ${url} timed out after ${timeout}ms`);
    } else {
      console.error(`Request failed to ${url}:`, error);
    }
    throw error;
  }
};
