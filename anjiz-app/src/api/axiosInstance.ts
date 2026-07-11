import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

apiClient.interceptors.request.use((config) => {
  if (config.url === "/login" || config.url === "/users") return config;

  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
