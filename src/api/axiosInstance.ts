import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

// Interceptor de respuesta para manejo global de errores
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const mensaje =
            error.response?.data?.error ||
            error.response?.data?.mensaje ||
            'Error de conexión con el servidor';
        return Promise.reject(new Error(mensaje));
    }
);

export default axiosInstance;