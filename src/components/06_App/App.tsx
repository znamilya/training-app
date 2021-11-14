import { IntlProvider } from "react-intl";

import ruMessages from "../../translations/ru.json";
import enMessages from "../../translations/en.json";

import HeaderModule from "../03_modules/Header";
import useAppController from "../../hooks/controllers/useAppController";

const messagesMap = {
    ru: ruMessages,
    en: enMessages,
};

function App() {
    const { lang } = useAppController();

    return (
        <div className="App">
            <IntlProvider locale={lang} messages={messagesMap[lang]}>
                <HeaderModule />
            </IntlProvider>
        </div>
    );
}

export default App;
