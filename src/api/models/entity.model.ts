import { CreateEntity } from "../../types/entity.type";
import { EntityDomain } from "../domains";

export const EntityModel = {
    create: (data: CreateEntity) => EntityDomain.Create(data)
}
