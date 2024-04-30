import { TMeta } from '@/types/common';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { getBaseUrl } from '../config/envConfig';
import { instance as axiosInstance } from './axiosInstance';

export const axiosBaseQuery = async ({
  url,
  method,
  data,
  params,
  contentType,
}: {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  meta?: TMeta;
  contentType?: string;
}) => {
  try {
    const result = await axiosInstance({
      url: getBaseUrl() + url,
      method,
      data,
      params,
      headers: {
        'Content-Type': contentType || 'application/json',
      },
      withCredentials: true,
    });
    return result;
  } catch (axiosError) {
    const error = axiosError as AxiosError;
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || error.message,
      },
    };
  }
};
