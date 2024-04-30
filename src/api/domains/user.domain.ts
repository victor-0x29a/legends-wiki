import { signInType } from "../../types/user.type";
import { ServerInstance } from "../instance";
import { extractData } from "../utils/extract-data";
import { getError } from "../utils/get-error";

const SignIn = (data: signInType) => ServerInstance.post("/user/sign-in", data).then(extractData).catch((error) => {
    throw getError(error)
})

export const UserDomain = {
    SignIn
}
