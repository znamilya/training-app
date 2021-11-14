import { IntlProvider } from "react-intl";
import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";

import ruMessages from "../../translations/ru.json";
import enMessages from "../../translations/en.json";

import useAppController from "../../hooks/controllers/useAppController";
import HeaderModule from "../03_modules/Header";
import Sidebar from "../03_modules/Sidebar";
import { SIDEBAR_WIDTH } from "../03_modules/Sidebar/Sidebar.styled";

const messagesMap = {
    ru: ruMessages,
    en: enMessages,
};

function App() {
    const { lang } = useAppController();

    return (
        <div className="App">
            <CssBaseline />
            <IntlProvider locale={lang} messages={messagesMap[lang]}>
                <HeaderModule />
                <Sidebar />
                <Box ml={`${SIDEBAR_WIDTH}px`} pt={8}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, inventore.
                </Box>
            </IntlProvider>
        </div>
    );
}

export default App;
