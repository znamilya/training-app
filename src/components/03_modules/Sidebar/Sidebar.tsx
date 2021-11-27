import { Toolbar } from "@mui/material";

import routes from "../../../routes";
import * as allProjectsCollection from "../../../store/collections/allProjects";
import * as allActiveProjectsCollection from "../../../store/collections/allActiveProjects";
import * as allTodayTasksCollection from "../../../store/collections/allTodayTasks";
import { useAppSelector } from "../../../store/store";
import MenuSection from "../../01_basic/MenuSection";

import { RootStyled } from "./Sidebar.styled";

const SidebarModule = () => {
    const allActiveProjects = useAppSelector(allProjectsCollection.selectors.selectAllActive);
    const allProjectsTotalCount = useAppSelector(allProjectsCollection.selectors.selectTotalCount);
    const allTodayTasksTotalCount = useAppSelector(
        allTodayTasksCollection.selectors.selectTotalCount,
    );

    return (
        <RootStyled variant="permanent">
            <Toolbar />
            <MenuSection
                items={[
                    { titleTransId: "SidebarModule.Inbox", href: routes.inbox({}), tasksCount: 0 },
                    {
                        titleTransId: "SidebarModule.NextTasks",
                        href: routes.today({}),
                        tasksCount: allTodayTasksTotalCount,
                    },
                    {
                        titleTransId: "SidebarModule.AllProjects",
                        href: routes.projects({}),
                        tasksCount: allProjectsTotalCount,
                    },
                ]}
            />
            <MenuSection
                titleTransId="SidebarModule.ActiveProjects"
                items={allActiveProjects.map((project) => ({
                    title: project.title,
                    href: routes.project({ projectId: project.id }),
                    tasksCount: project.tasks.length,
                }))}
            />
        </RootStyled>
    );
};

export default SidebarModule;
