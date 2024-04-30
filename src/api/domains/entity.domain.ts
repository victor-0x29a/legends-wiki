import { CreateEntity } from "../../types/entity.type";
import { CreateServerInstance } from "../instance";
import { getError } from "../utils/get-error";

const Create = (data: CreateEntity) => CreateServerInstance().post("/entity", data).catch(getError)

export const EntityDomain = {
    Create
}
