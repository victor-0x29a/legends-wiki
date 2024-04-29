import { CreateEntity } from "../../types/entity.type";
import { ServerInstance } from "../instance";

const Create = (data: CreateEntity) => ServerInstance.post("/entity", data)

export const EntityDomain = {
    Create
}
