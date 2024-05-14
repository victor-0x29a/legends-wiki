type ImageObject = {
    src: string
    alt: string
}

export type Entity = {
    id: number
    title: string
    properties: object
    description: string
    author: string | null
    image: null | ImageObject
    sections: string | null
    type: string
}

interface FindOneEntity extends Entity {
    createdAt: string
    updatedAt: string
}

export type CreateEntity = {
    title: string
    properties: object
    description: string
    author: string | null
    image: null | ImageObject
    sections: string | null
    type: string
}

export type EntityFilters = {
    page: number
    perPage: number
} & Partial<Entity>

export type MinimalEntity = {
    id: number
    title: string
    image: null | ImageObject
}

export type ListEntityResponse = {
    page: number
    perPage: number
    totalPages: number
    entries: MinimalEntity[]
}
