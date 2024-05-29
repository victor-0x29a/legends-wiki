import { signInPayload, createUserPayload, editUserPayload } from "../../types/user.type";
import { AxiosInstance } from "../instance";
import { extractData } from "../utils/extract-data";
import { getError } from "../utils/get-error";

const SignIn = (data: signInPayload) => AxiosInstance.post("/user/sign-in", data).then(extractData).catch(getError)

const FindAll = () => AxiosInstance.get("/user").then(extractData).catch(getError)

const Delete = (id: number) => AxiosInstance.delete(`/user/${id}`).catch(getError)

const FindOne = (id: number) => AxiosInstance.get(`/user/${id}`).then(extractData).catch(getError)

const Create = (data: createUserPayload) => AxiosInstance.post("/user", data).then(extractData).catch(getError)

const Edit = (id: number, data: editUserPayload) => AxiosInstance.put(`/user/${id}`, data).catch(getError)

export const UserDomain = {
    SignIn,
    FindAll,
    Delete,
    FindOne,
    Create,
    Edit
}
