import { CreateEntity } from "../../types/entity.type";
import { EntityDomain } from "../domains";
import { EntityParser } from "../parsers/entity.parser";

export const EntityModel = {
    create: (data: CreateEntity) => EntityDomain.Create(EntityParser.create(data))
}
