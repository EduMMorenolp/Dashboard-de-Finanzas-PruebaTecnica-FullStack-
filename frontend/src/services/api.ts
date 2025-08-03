import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  getChartData: () => api.get('/chart'),
  getMetrics: () => api.get('/metrics'),
};

export default api;