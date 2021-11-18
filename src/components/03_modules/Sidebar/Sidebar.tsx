import { Toolbar } from "@mui/material";

import MenuSection from "../../01_basic/MenuSection";

import { RootStyled } from "./Sidebar.styled";

const SidebarModule = () => {
    return (
        <RootStyled variant="permanent">
            <Toolbar />
            <MenuSection
                items={[
                    { titleTransId: "SidebarModule.Inbox", href: "/inbox" },
                    { titleTransId: "SidebarModule.NextTasks", href: "/next-actions" },
                ]}
            />
            <MenuSection
                titleTransId="SidebarModule.ActiveProjects"
                items={[
                    { title: "Read a book", href: "/projects/adw-awd213ad-aw" },
                    { title: "Clean up the kitchen", href: "/projects/adw123-f3ad-aw" },
                ]}
            />
            <MenuSection titleTransId="SidebarModule.OtherProjects" items={[]} />
        </RootStyled>
    );
};

export default SidebarModule;
