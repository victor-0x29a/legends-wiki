import { CreateEntity } from "../../types/entity.type";
import { EntityDomain } from "../domains";
import { EntityParser } from "../parsers/entity.parser";
import { getError } from "../utils/get-error";

export const EntityModel = {
    create: (data: CreateEntity) => EntityDomain.Create(EntityParser.create(data)).catch(getError)
}
