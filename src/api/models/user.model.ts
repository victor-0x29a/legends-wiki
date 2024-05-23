import { signInPayload, signInResponse } from "../../types/user.type";
import { UserDomain } from "../domains";

export const UserModel = {
    signIn: (data: signInPayload): Promise<signInResponse> => UserDomain.SignIn(data),
    findAll: () => UserDomain.FindAll()
}
