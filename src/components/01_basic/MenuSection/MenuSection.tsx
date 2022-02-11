import { ReactNode } from "react";
import { List, ListSubheader, Divider } from "@mui/material";
import { FormattedMessage } from "react-intl";

export type MenuSectionProps = {
    titleTransId?: string;
    children: ReactNode;
};

const MenuSection = ({ titleTransId, children }: MenuSectionProps) => {
    return (
        <nav>
            <List
                subheader={
                    titleTransId && (
                        <>
                            <ListSubheader id="menu-section-title" data-testid="menu-section-title">
                                <FormattedMessage id={titleTransId} />
                            </ListSubheader>
                        </>
                    )
                }
                aria-labelledby="menu-section-title"
                disablePadding
            >
                {children}
            </List>
        </nav>
    );
};

export default MenuSection;
