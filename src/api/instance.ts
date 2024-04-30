import axios from "axios";

export const CreateServerInstance = function() {
    return axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}
