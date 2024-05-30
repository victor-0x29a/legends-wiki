export const ARMOR_ENTITY = "armors"

export const COLLECTIBLE_ENTITY = "collectibles"

export const BOSS_ENTITY = "boss"

export const ITEM_ENTITY = "item"

export const QUEST_ENTITY = "quest"

export const Entities = [
    ARMOR_ENTITY,
    COLLECTIBLE_ENTITY,
    BOSS_ENTITY,
    QUEST_ENTITY,
    ITEM_ENTITY
]

export const entityTypes = {
    [ITEM_ENTITY]: "Item",
    [BOSS_ENTITY]: "Boss",
    [QUEST_ENTITY]: "Missão",
    [ARMOR_ENTITY]: "Armadura",
    [COLLECTIBLE_ENTITY]: "Colecionáveis"
} as {
    [key: string]: string
}

export const entityTypesArray = Object.entries(entityTypes).map((data) => data[0])
