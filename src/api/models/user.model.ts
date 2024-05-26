import { AxiosResponse } from "axios";
import { signInPayload, signInResponse, findAllUsersResponse, findOneUserResponse, createUserPayload, createUserResponse, editUserPayload } from "../../types/user.type";
import { UserDomain } from "../domains";
import { UserParser } from "../parsers/user.parser";

export const UserModel = {
    signIn: (data: signInPayload): Promise<signInResponse> => UserDomain.SignIn(data),
    findAll: (): Promise<findAllUsersResponse> => UserDomain.FindAll(),
    delete: (id: number): Promise<AxiosResponse> => UserDomain.Delete(id),
    findOne: (id: number): Promise<findOneUserResponse> => UserDomain.FindOne(id),
    create: (data: createUserPayload): Promise<createUserResponse> => UserDomain.Create(UserParser.create(data)),
    edit: (id: number, data: editUserPayload): Promise<AxiosResponse> => UserDomain.Edit(id, UserParser.edit(data))
}
