import { IntlProvider } from "react-intl";
import { CssBaseline } from "@mui/material";

import ruMessages from "../../translations/ru.json";
import enMessages from "../../translations/en.json";

import useAppController from "../../hooks/controllers/useAppController";
import HeaderModule from "../03_modules/Header";
import SidebarModule from "../03_modules/Sidebar";
import TodayTasksModule from "../03_modules/TodayTasks/TodayTasks";
import PageWrapper from "../04_layouts/PageWrapper";

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
                <SidebarModule />
                <PageWrapper>
                    <TodayTasksModule projectId={1} />
                </PageWrapper>
            </IntlProvider>
        </div>
    );
}

export default App;
