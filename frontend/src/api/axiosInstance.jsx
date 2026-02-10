import axios from "axios";

const apiBaseURL = (() => {
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl && typeof envUrl === "string") {
        return envUrl.replace(/\/$/, ""); // trim trailing slash if present
    }
    // Fallback to current origin so production does not call localhost
    return `${window.location.origin}/api`;
})();

const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true, // include cookies on cross-site requests so backend can read cookie token
});

api.interceptors.request.use((config) => {
    // Do not attach Authorization header from localStorage.
    // Authentication is handled by httpOnly cookies (withCredentials: true).
    return config;
},(error) => Promise.reject(error));

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      // User session expired, redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
