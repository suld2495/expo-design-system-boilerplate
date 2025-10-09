import { axiosInstance } from './axios-instance';
import { toAppError } from './app-error';

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

// GET 요청
export async function get<T>(url: string, options?: RequestOptions): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(url, options);
    return response.data;
  } catch (error) {
    throw toAppError(error);
  }
}

// POST 요청
export async function post<T>(
  url: string,
  data?: any,
  options?: RequestOptions,
): Promise<T> {
  try {
    const response = await axiosInstance.post<T>(url, data, options);
    return response.data;
  } catch (error) {
    throw toAppError(error);
  }
}

// PUT 요청
export async function put<T>(
  url: string,
  data?: any,
  options?: RequestOptions,
): Promise<T> {
  try {
    const response = await axiosInstance.put<T>(url, data, options);
    return response.data;
  } catch (error) {
    throw toAppError(error);
  }
}

// PATCH 요청
export async function patch<T>(
  url: string,
  data?: any,
  options?: RequestOptions,
): Promise<T> {
  try {
    const response = await axiosInstance.patch<T>(url, data, options);
    return response.data;
  } catch (error) {
    throw toAppError(error);
  }
}

// DELETE 요청
export async function del<T>(url: string, options?: RequestOptions): Promise<T> {
  try {
    const response = await axiosInstance.delete<T>(url, options);
    return response.data;
  } catch (error) {
    throw toAppError(error);
  }
}
