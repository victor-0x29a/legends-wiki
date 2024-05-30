import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

AxiosInstance.interceptors.request.use(function(config) {
    config.headers.Authorization = localStorage.getItem("token")
    return config
})
