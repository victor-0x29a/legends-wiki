import { CreateEntity, EntityFilters, FindOneEntity } from "../../types/entity.type";

export const EntityParser = {
    create: (data: CreateEntity) => ({
        ...data,
        author: data.author ? data.author : null,
        image: data.image ? data.image : null,
    }),
    list: ({ page, perPage }: EntityFilters) => ({
        page,
        perPage
    }),
    single: (entity: FindOneEntity) => entity
}
