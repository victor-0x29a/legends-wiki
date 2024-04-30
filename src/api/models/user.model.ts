import { signInResponseType, signInType } from "../../types/user.type";
import { UserDomain } from "../domains";
import { getError } from "../utils/get-error";

export const UserModel = {
    signIn: (data: signInType): Promise<signInResponseType> => UserDomain.SignIn(data).catch(getError)
}
