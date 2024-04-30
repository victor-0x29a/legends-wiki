import { signInResponseType, signInType } from "../../types/user.type";
import { UserDomain } from "../domains";

export const UserModel = {
    signIn: (data: signInType): Promise<signInResponseType> => UserDomain.SignIn(data)
}
