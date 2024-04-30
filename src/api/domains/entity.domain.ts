import { CreateEntity } from "../../types/entity.type";
import { ServerInstance } from "../instance";
import { getError } from "../utils/get-error";

const Create = (data: CreateEntity) => ServerInstance.post("/entity", data).catch(getError)

export const EntityDomain = {
    Create
}
