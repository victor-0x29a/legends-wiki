import { CreateEntity, EditEntityPayload, EntityFilters, ListEntityResponse } from "../../types/entity.type";
import { EntityDomain } from "../domains";
import { EntityParser } from "../parsers/entity.parser";

export const EntityModel = {
    create: (data: CreateEntity) => EntityDomain.Create(EntityParser.create(data)),
    list: (data: EntityFilters): Promise<ListEntityResponse> => EntityDomain.List(EntityParser.list(data)),
    delete: (id: number) => EntityDomain.Delete(id),
    findOne: (id: number) => EntityDomain.View(id).then(EntityParser.single),
    edit: (id: number, data: EditEntityPayload) => EntityDomain.Edit(id, EntityParser.edit(data))
}
