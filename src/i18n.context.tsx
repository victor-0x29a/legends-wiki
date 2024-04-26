import { createContext, useCallback, useMemo, useState } from "react";
import { I18nData, language } from "./types/i18n.type";

type I18nContextValues = {
    locale: language;
    onChangeLocale: (newLocale: language) => void;
    translate: (i18n: I18nData, key: string) => string;
}

type I18nProviderProps = {
    children: React.ReactNode;
};

export const I18nContext = createContext<I18nContextValues>({
    locale: "pt-br",
    onChangeLocale: () => { },
    translate: () => ""
});

export const I18nProvider = ({ children }: I18nProviderProps) => {
    const [locale, setLocale] = useState<language>("pt-br");

    const onChangeLocale = useCallback((newLocale: language) => setLocale(newLocale), []);

    const translate = useCallback((i18n: I18nData, key: string) => {
        return i18n?.[key]?.[locale] || key;
    }, [locale])

    const values = useMemo(() => ({
        locale,
        onChangeLocale,
        translate
    }), [locale, onChangeLocale, translate]);
    return <I18nContext.Provider value={values}>{children}</I18nContext.Provider>;
};