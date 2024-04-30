import { signInType } from "../../types/user.type";
import { ServerInstance } from "../instance";

const SignIn = (data: signInType) => ServerInstance.post("/user/sign-in", data)

export const UserDomain = {
    SignIn
}
