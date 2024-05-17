import { CreateEntity, EntityFilters, FindOneEntity, EditEntityPayload } from "../../types/entity.type";

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
    single: (entity: FindOneEntity) => entity,
    edit: ({
        author,
        description,
        image,
        properties,
        sections,
        title,
        type
    }: EditEntityPayload) => ({
        author: author || undefined,
        description: description || undefined,
        image: image === null ? null : image,
        properties: properties || undefined,
        sections: sections || undefined,
        title: title || undefined,
        type: type || undefined
    })
}
