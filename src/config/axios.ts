import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

import { API_URL } from '@config/env'

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const http = {
  get: async <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    API.get<T>(path, config),
  post: async <T>(path: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    API.post<T>(path, data, config),
  put: async <T>(path: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    API.put<T>(path, data, config),
  patch: async <T>(path: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    API.patch<T>(path, data, config),
  delete: async <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    API.delete<T>(path, config),
}
