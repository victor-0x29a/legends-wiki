import axios from "axios";

export const ServerInstance = axios.create({
    baseURL: process.env.VITE_SERVER_URL
})
