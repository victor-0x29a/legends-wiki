export type PT_BR = "pt-br"
export type ES = "es"
export type EN = "en"
export type language = PT_BR | ES | EN

export type I18nData = {
    [key: string]: {
        [key in language]: string
    }
}