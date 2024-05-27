export const I18nLanguages = [
    { value: 'pt-br', label: '🇧🇷' },
    { value: 'en', label: '🇺🇸' },
    { value: 'es', label: '🇪🇸' }
]

export const Environment = (function () {
    const env = import.meta.env.VITE_ENVIRONMENT

    return {
        isProduction: env === 'production',
        isDevelopment: env === 'development',
        isTest: env === 'test'
    }
}())
