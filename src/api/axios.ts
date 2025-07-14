import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:3000",
//   withCredentials: true,
// });

// export default axiosInstance;

// import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
