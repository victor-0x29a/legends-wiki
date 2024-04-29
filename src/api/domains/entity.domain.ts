import { CreateEntity } from "../../types/entity.type";
import { ServerInstance } from "../instance";

const EntityDomain = ServerInstance

const Create = (data: CreateEntity) => EntityDomain.post("/entity", data)

export {
    Create
}
