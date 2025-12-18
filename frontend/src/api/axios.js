import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxied by Vite to http://localhost:5000
    // headers: { 'Content-Type': 'application/json' } <-- Removed to allow multipart/form-data
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
