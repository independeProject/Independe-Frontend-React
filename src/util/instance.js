import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://13.209.65.163:8080",
});

axiosInstance.interceptors.request.use(
    function (config) {
        config.headers.Authorization = "Bearer your_access_token";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;
