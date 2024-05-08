import { CreateEntity, EntityFilters, ListEntityResponse } from "../../types/entity.type";
import { EntityDomain } from "../domains";
import { EntityParser } from "../parsers/entity.parser";

export const EntityModel = {
    create: (data: CreateEntity) => EntityDomain.Create(EntityParser.create(data)),
    list: (data: EntityFilters): Promise<ListEntityResponse> => EntityDomain.List(EntityParser.list(data)),
    delete: (id: number) => EntityDomain.Delete(id)
}
