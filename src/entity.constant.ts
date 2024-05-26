export const entityTypes = {
    "item": "Item",
    "boss": "Boss",
    "npc": "NPC",
    "location": "Localização",
    "quest": "Missão",
} as {
    [key: string]: string
}

export const entityTypesArray = Object.entries(entityTypes).map((data) => data[0])
