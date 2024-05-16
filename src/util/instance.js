import axios from "axios";

let isRefreshing = false;
let refreshPromise = null;

const axiosInstance = axios.create({
    // baseURL: "http://13.209.65.163:8080",
    //api계정키
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        console.log("^^token", token);
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
