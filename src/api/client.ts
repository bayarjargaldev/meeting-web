import axios, { AxiosInstance, AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_API_URL;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
        }
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const res = await this.client.get<T>(url, { params });
    return res.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const res = await this.client.post<T>(url, data);
    return res.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const res = await this.client.put<T>(url, data);
    return res.data;
  }

  async delete<T>(url: string): Promise<T> {
    const res = await this.client.delete<T>(url);
    return res.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
