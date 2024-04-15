
import axios from 'axios';

// Create an instance of axios with default configuration
const AxiosInstance = axios.create({
  baseURL: 'https://api.vosovyapar.com/api/a1/',
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  function(config) {
    // Get token from localStorage or wherever you store it
    const token = localStorage.getItem('accessToken');
    
    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { AxiosInstance }; // Exporting AxiosInstance