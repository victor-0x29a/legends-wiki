import { createContext, useCallback, useMemo, useState } from "react";
import { language } from "./types/i18n.type";

type I18nContextValues = {
    locale: language;
    onChangeLocale: (newLocale: language) => void;
}

type I18nProviderProps = {
    children: React.ReactNode;
};

export const I18nContext = createContext<I18nContextValues>({
    locale: "pt-br",
    onChangeLocale: () => { }
});

export const I18nProvider = ({ children }: I18nProviderProps) => {
    const [locale, setLocale] = useState<language>("pt-br");

    const onChangeLocale = useCallback((newLocale: language) => setLocale(newLocale), []);

    const values = useMemo(() => ({
        locale,
        onChangeLocale
    }), [locale, onChangeLocale]);
    return <I18nContext.Provider value={values}>{children}</I18nContext.Provider>;
};