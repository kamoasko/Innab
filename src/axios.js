import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://innab.coder.az/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adding a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;