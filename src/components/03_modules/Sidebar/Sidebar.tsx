import { Toolbar } from "@mui/material";

import MenuSection from "../../01_basic/MenuSection";

import { RootStyled } from "./Sidebar.styled";

const Sidebar = () => {
    return (
        <RootStyled variant="permanent">
            <Toolbar />
            <MenuSection
                items={[
                    { title: "Inbox", href: "/inbox" },
                    { title: "Next Actions", href: "/next-actions" },
                ]}
            />
            <MenuSection
                title="Active Projects"
                items={[
                    { title: "Read a book", href: "/projects/adw-awd213ad-aw" },
                    { title: "Clean up the kitchen", href: "/projects/adw123-f3ad-aw" },
                ]}
            />
            <MenuSection title="Other Projects" items={[]} />
        </RootStyled>
    );
};

export default Sidebar;
