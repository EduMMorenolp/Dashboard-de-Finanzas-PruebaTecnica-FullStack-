import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiService = {
  getChartData: (period?: string) => api.get("/chart", { params: { period } }),
  getMetrics: (period?: string) => api.get("/metrics", { params: { period } }),
};

export default api;