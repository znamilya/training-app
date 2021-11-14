import { createContext, ReactNode, useState } from "react";

import { AvailableLangs } from "../types";

type AppContextType = {
    lang: AvailableLangs;
    setLang(lang: AvailableLangs): void;
};

export const AppContext = createContext<AppContextType>({
    lang: "en",
    setLang() {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<AvailableLangs>("en");

    return <AppContext.Provider value={{ lang, setLang }}>{children}</AppContext.Provider>;
};
