import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // include cookies on cross-site requests so backend can read cookie token
});

api.interceptors.request.use((config) => {
    // Do not attach Authorization header from localStorage.
    // Authentication is handled by httpOnly cookies (withCredentials: true).
    return config;
},(error) => Promise.reject(error));

export default api;