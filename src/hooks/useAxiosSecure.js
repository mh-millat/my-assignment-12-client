// import { useEffect } from 'react';
// import axiosSecure from '../api/axiosSecure';

// const useAxiosSecure = () => {
//   useEffect(() => {
//     // Optional: Add interceptor if you use token
//     // axiosSecure.interceptors.request.use((config) => {
//     //   const token = localStorage.getItem('access-token');
//     //   if (token) {
//     //     config.headers.Authorization = `Bearer ${token}`;
//     //   }
//     //   return config;
//     // });
//   }, []);

//   return axiosSecure;
// };

// export default useAxiosSecure;

import { useEffect } from 'react';
import axiosSecure from '../api/axiosSecure';

/**
 * Custom hook to return secured Axios instance with token interceptor.
 */
const useAxiosSecure = () => {
  useEffect(() => {
    // Add request interceptor to attach token
    const interceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Remove interceptor on component unmount
    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
