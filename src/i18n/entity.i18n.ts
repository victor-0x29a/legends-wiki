import { ARMOR_ENTITY, BOSS_ENTITY, COLLECTIBLE_ENTITY, ITEM_ENTITY, QUEST_ENTITY } from "../entity.constant";
import { I18nData } from "../types/i18n.type";

export const EntityList: I18nData = {
    "Geral": {
        "en": "General",
        "es": "General",
        "pt-br": "Geral"
    },
    "Colecionáveis": {
        "en": "Collectibles",
        "es": "Coleccionables",
        "pt-br": "Colecionáveis"
    },
    [COLLECTIBLE_ENTITY]: {
        "en": "Collectibles",
        "es": "Coleccionables",
        "pt-br": "Colecionáveis"
    },
    "Armadura": {
        "en": "Armor",
        "es": "Armadura",
        "pt-br": "Armadura"
    },
    [ARMOR_ENTITY]: {
        "en": "Armor",
        "es": "Armadura",
        "pt-br": "Armadura"
    },
    "Bosses": {
        "en": "Bosses",
        "es": "Jefes",
        "pt-br": "Chefes"
    },
    [BOSS_ENTITY]: {
        "en": "Bosses",
        "es": "Jefes",
        "pt-br": "Chefes"
    },
    "Itens": {
        "en": "Items",
        "es": "Artículos",
        "pt-br": "Itens"
    },
    [ITEM_ENTITY]: {
        "en": "Items",
        "es": "Artículos",
        "pt-br": "Itens"
    },
    [QUEST_ENTITY]: {
        "en": "Quests",
        "es": "Misiones",
        "pt-br": "Missões"
    }
}
