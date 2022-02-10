import { IntlProvider } from "react-intl";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

import ruMessages from "../../translations/ru.json";
import enMessages from "../../translations/en.json";

import routes from "../../routes";
import useAppController from "../../hooks/controllers/useAppController";
// import HeaderModule from "../03_modules/Header";
import SidebarModule from "../03_modules/Sidebar";
import PageWrapper from "../04_layouts/PageWrapper";
import TodayTasksPage from "../05_pages/TodayTasks";
// import InboxTasksPage from "../05_pages/InboxTasks";
import AllCategoriesPage from "../05_pages/AllCategories";
import AllProjectsPage from "../05_pages/AllProjects";
import ProjectDetailsPage from "../05_pages/ProjectDetails";

import { RootStyled } from "./App.styled";
import PageTitle from "../01_basic/PageTitle";
import { useEffect, useState } from "react";
import { useAllProjects } from "../../store/collections/allProjects";
import { useAllActiveProjects } from "../../store/collections/allActiveProjects";

const messagesMap = {
    ru: ruMessages,
    en: enMessages,
};

function App() {
    const { lang } = useAppController();
    const { load } = useAllProjects();
    const allActiveProjects = useAllActiveProjects();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([load(), allActiveProjects.load()]).then(() => setIsLoading(false));
    }, [load]);

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

            <IntlProvider locale={lang} messages={messagesMap[lang]}>
                <BrowserRouter>
                    {/* <HeaderModule /> */}
                    {isLoading ? (
                        "Loading... "
                    ) : (
                        <>
                            <SidebarModule />
                            <PageWrapper>
                                <Switch>
                                    {/* <Route path={routes.inbox.template} exact>
                                    <InboxTasksPage />
                                </Route> */}
                                    <Route path={routes.today.template} exact>
                                        <TodayTasksPage />
                                    </Route>
                                    <Route path={routes.projects.template} exact>
                                        <AllProjectsPage />
                                    </Route>
                                    <Route path={routes.project.template} exact>
                                        <ProjectDetailsPage />
                                    </Route>
                                    <Route path={routes.categories.template} exact>
                                        <AllCategoriesPage />
                                    </Route>
                                    <Route path="*">
                                        <PageTitle>Page not found</PageTitle>
                                    </Route>
                                </Switch>
                            </PageWrapper>
                        </>
                    )}
                </BrowserRouter>
            </IntlProvider>
        </RootStyled>
    );
}

export default App;
