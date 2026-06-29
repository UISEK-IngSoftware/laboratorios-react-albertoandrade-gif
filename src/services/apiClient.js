import axios from "axios";
import { clearTokens, getAccessToken } from "./tokenStorage";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: BASE_URL.replace(/\/$/, ""),
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearTokens();
    }

    return Promise.reject(error);
  }
);

export function getApiErrorMessage(error, fallbackMessage) {
  const data = error.response?.data;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (data?.detail) {
    return data.detail;
  }

  if (data && typeof data === "object") {
    const firstEntry = Object.entries(data)[0];
    if (firstEntry) {
      const [field, messages] = firstEntry;
      const message = Array.isArray(messages) ? messages[0] : messages;
      return `${field}: ${message}`;
    }
  }

  return fallbackMessage;
}

export default apiClient;
