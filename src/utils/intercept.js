import axios from 'axios';
import { BACKEND_URL } from '../url/url';
import toast from 'react-hot-toast';

// Create an instance of axios with default configuration
const AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  function (config) {
    // Get token from localStorage or wherever you store it
    const token = localStorage.getItem('accessToken');

    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Initialize useHistory for navigation
    if (error.response.status === 401 || error.response.data?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      toast.error('UnaUnauthorized');
    }
    // Reject the promise with the error
    return Promise.reject(error);
  }
);
export { AxiosInstance }; // Exporting AxiosInstance
