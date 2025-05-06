import axios, { AxiosError } from 'axios';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
// apiClient.interceptors.request.use(
//     (config) => {
//
//       return config;
//     },
//     (error) => Promise.reject(error)
// );

// Response interceptor - handle common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle authentication errors
      if (error.response?.status === 401) {
        // Redirect to login page on authentication error
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
);

export default apiClient;
