import { AxiosResponse } from "axios";
import { signInPayload, signInResponse, findAllUsersResponse, findOneUserResponse } from "../../types/user.type";
import { UserDomain } from "../domains";

export const UserModel = {
    signIn: (data: signInPayload): Promise<signInResponse> => UserDomain.SignIn(data),
    findAll: (): Promise<findAllUsersResponse> => UserDomain.FindAll(),
    delete: (id: number): Promise<AxiosResponse> => UserDomain.Delete(id),
    findOne: (id: number): Promise<findOneUserResponse> => UserDomain.FindOne(id)
}
