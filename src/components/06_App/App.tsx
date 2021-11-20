import { IntlProvider } from "react-intl";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

import ruMessages from "../../translations/ru.json";
import enMessages from "../../translations/en.json";

import routes from "../../routes";
import useAppController from "../../hooks/controllers/useAppController";
import HeaderModule from "../03_modules/Header";
import SidebarModule from "../03_modules/Sidebar";
import PageWrapper from "../04_layouts/PageWrapper";
import TodayTasksPage from "../05_pages/TodayTasks";
import InboxTasksPage from "../05_pages/InboxTasks";
import AllProjectsPage from "../05_pages/AllProjects";
import ProjectDetailsPage from "../05_pages/ProjectDetails";

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
                <BrowserRouter>
                    <HeaderModule />
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
        </div>
    );
}

export default App;
