import axios from 'axios';

// Backend base URL
// const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://my-assignment-12-server-kappa.vercel.app';
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://my-assignment-12-server-kappa.vercel.app';

const axiosSecure = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: JWT token injection
axiosSecure.interceptors.request.use(config => {
  const token = localStorage.getItem('access-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosSecure;
