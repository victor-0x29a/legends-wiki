import { signInType } from "../../types/user.type";
import { ServerInstance } from "../instance";
import { extractData } from "../utils/extract-data";

const SignIn = (data: signInType) => ServerInstance.post("/user/sign-in", data).then(extractData)

export const UserDomain = {
    SignIn
}
