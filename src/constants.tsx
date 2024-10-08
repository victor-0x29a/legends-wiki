export const I18nLanguages = [
    { value: 'pt-br', label: 'PT-BR' },
    { value: 'en', label: 'EN-US' },
    { value: 'es', label: 'ES' }
] as {
    value: 'pt-br' | 'en' | 'es',
    label: 'PT-BR' | 'EN-US' | 'ES'
}[]

export const Environment = (function () {
    const env = import.meta.env.VITE_ENVIRONMENT

    return {
        isProduction: env === 'production',
        isDevelopment: env === 'development',
        isTest: env === 'test'
    }
}())
