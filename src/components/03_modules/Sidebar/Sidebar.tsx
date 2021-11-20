import { Toolbar } from "@mui/material";

import routes from "../../../routes";
import MenuSection from "../../01_basic/MenuSection";

import { RootStyled } from "./Sidebar.styled";

const SidebarModule = () => {
    return (
        <RootStyled variant="permanent">
            <Toolbar />
            <MenuSection
                items={[
                    { titleTransId: "SidebarModule.Inbox", href: routes.inbox({}), tasksCount: 0 },
                    {
                        titleTransId: "SidebarModule.NextTasks",
                        href: routes.today({}),
                        tasksCount: 2,
                    },
                    {
                        titleTransId: "SidebarModule.OtherProjects",
                        href: routes.projects({}),
                        tasksCount: 2,
                    },
                ]}
            />
            <MenuSection
                titleTransId="SidebarModule.ActiveProjects"
                items={[
                    {
                        title: "Read a book",
                        href: routes.project({ projectId: "123-21321adw " }),
                        tasksCount: 2,
                    },
                    {
                        title: "Clean up the kitchen",
                        href: routes.project({ projectId: "adawda-21321adw " }),
                        tasksCount: 3,
                    },
                ]}
            />
        </RootStyled>
    );
};

export default SidebarModule;
