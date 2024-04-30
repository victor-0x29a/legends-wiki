import { signInType } from "../../types/user.type";
import { UserDomain } from "../domains";

export const UserModel = {
    signIn: (data: signInType) => UserDomain.SignIn(data)
}
