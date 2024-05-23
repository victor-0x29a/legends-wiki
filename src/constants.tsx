export const I18nLanguages = [
    { value: 'pt-br', label: '🇧🇷' },
    { value: 'en', label: '🇺🇸' },
    { value: 'es', label: '🇪🇸' }
]

export const ARMOR_ENTITY = "armors"

export const COLLECTIBLE_ENTITY = "collectibles"

export const BOSS_ENTITY = "boss"

export const ITEM_ENTITY = "item"

export const Entities = [
    ARMOR_ENTITY,
    COLLECTIBLE_ENTITY,
    BOSS_ENTITY,
    ITEM_ENTITY
]

export const Environment = (function () {
    const env = import.meta.env.VITE_ENVIRONMENT

    return {
        isProduction: env === 'production',
        isDevelopment: env === 'development',
        isTest: env === 'test'
    }
}())
