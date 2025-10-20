import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://dashing-heliotrope-83dad3.netlify.app//",
  withCredentials: true,
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosSecure;
