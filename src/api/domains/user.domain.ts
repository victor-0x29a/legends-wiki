import { signInPayload, createUserPayload, editUserPayload } from "../../types/user.type";
import { CreateServerInstance } from "../instance";
import { extractData } from "../utils/extract-data";
import { getError } from "../utils/get-error";

const SignIn = (data: signInPayload) => CreateServerInstance().post("/user/sign-in", data).then(extractData).catch(getError)

const FindAll = () => CreateServerInstance().get("/user").then(extractData).catch(getError)

const Delete = (id: number) => CreateServerInstance().delete(`/user/${id}`).catch(getError)

const FindOne = (id: number) => CreateServerInstance().get(`/user/${id}`).then(extractData).catch(getError)

const Create = (data: createUserPayload) => CreateServerInstance().post("/user", data).then(extractData).catch(getError)

const Edit = (id: number, data: editUserPayload) => CreateServerInstance().put(`/user/${id}`, data).catch(getError)

export const UserDomain = {
    SignIn,
    FindAll,
    Delete,
    FindOne,
    Create,
    Edit
}
