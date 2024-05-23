import { signInPayload } from "../../types/user.type";
import { CreateServerInstance } from "../instance";
import { extractData } from "../utils/extract-data";
import { getError } from "../utils/get-error";

const SignIn = (data: signInPayload) => CreateServerInstance().post("/user/sign-in", data).then(extractData).catch(getError)

const FindAll = () => CreateServerInstance().get("/user").then(extractData).catch(getError)

export const UserDomain = {
    SignIn,
    FindAll
}
