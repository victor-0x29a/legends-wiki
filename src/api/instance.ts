import axios from "axios";

export const ServerInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})
