import { IntlProvider } from "react-intl";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider as ReduxProvider } from "react-redux";

import ruMessages from "../../translations/ru.json";
import enMessages from "../../translations/en.json";

import routes from "../../routes";
import useAppController from "../../hooks/controllers/useAppController";
import store from "../../store";
// import HeaderModule from "../03_modules/Header";
import SidebarModule from "../03_modules/Sidebar";
import PageWrapper from "../04_layouts/PageWrapper";
import TodayTasksPage from "../05_pages/TodayTasks";
import InboxTasksPage from "../05_pages/InboxTasks";
import AllProjectsPage from "../05_pages/AllProjects";
import ProjectDetailsPage from "../05_pages/ProjectDetails";

import { RootStyled } from "./App.styled";

const messagesMap = {
    ru: ruMessages,
    en: enMessages,
};

function App() {
    const { lang } = useAppController();

    return (
        <RootStyled>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    html: {
                        height: "100%",
                    },
                    body: {
                        height: "100%",
                    },
                    "#root": {
                        height: "100%",
                    },
                }}
            />
            <ReduxProvider store={store}>
                <IntlProvider locale={lang} messages={messagesMap[lang]}>
                    <BrowserRouter>
                        {/* <HeaderModule /> */}
                        <SidebarModule />
                        <PageWrapper>
                            <Switch>
                                <Route path={routes.inbox.template} exact>
                                    <InboxTasksPage />
                                </Route>
                                <Route path={routes.today.template} exact>
                                    <TodayTasksPage />
                                </Route>
                                <Route path={routes.projects.template} exact>
                                    <AllProjectsPage />
                                </Route>
                                <Route path={routes.project.template} exact>
                                    <ProjectDetailsPage />
                                </Route>
                            </Switch>
                        </PageWrapper>
                    </BrowserRouter>
                </IntlProvider>
            </ReduxProvider>
        </RootStyled>
    );
}

export default App;
