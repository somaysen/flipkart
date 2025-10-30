import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // include cookies on cross-site requests so backend can read cookie token
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const sellerToken = localStorage.getItem("sellerToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    } else if (sellerToken) {
        config.headers.Authorization = `Bearer ${sellerToken}`;
    }
    return config;
},(error) => Promise.reject(error));

export default api;