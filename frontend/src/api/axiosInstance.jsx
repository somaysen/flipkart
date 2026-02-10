import axios from "axios";

// Determine base URL - prioritize VITE_API_URL environment variable
let apiBaseURL;

if (import.meta.env.VITE_API_URL) {
    apiBaseURL = import.meta.env.VITE_API_URL;
} else if (import.meta.env.PROD) {
    // Production: use backend service URL
    apiBaseURL = "https://flipkart-n0vl.onrender.com/api";
} else {
    // Development: use localhost
    apiBaseURL = "http://localhost:3000/api";
}

// Remove trailing slash
apiBaseURL = apiBaseURL.replace(/\/$/, "");

console.log("[API Config] Base URL:", apiBaseURL, "| Prod:", import.meta.env.PROD);

const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true,
    timeout: 15000,
});

api.interceptors.request.use((config) => {
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific errors
    if (error.response?.status === 401) {
      window.location.href = '/login';
    } else if (error.code === 'ECONNABORTED' || error.message === 'timeout of 15000ms exceeded') {
      console.error("[API Error] Request timeout");
    } else if (error.code === 'ERR_NETWORK') {
      console.error("[API Error] Network error - check backend URL or CORS");
    }
    return Promise.reject(error);
  }
);

export default api;
