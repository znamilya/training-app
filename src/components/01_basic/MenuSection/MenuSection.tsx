import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListSubheader,
    Divider,
} from "@mui/material";
import { NavLink } from "typesafe-routes/react-router";
import { FormattedMessage } from "react-intl";

import TaskCounter from "../TaskCounter";
import { useEffect } from "react";

export type MenuSectionItem = {
    href: { $: string };
    tasksCount: number;
} & (
    | {
          title: string;
      }
    | {
          titleTransId: string;
      }
);

export type MenuSectionProps = {
    titleTransId?: string;
    items: MenuSectionItem[];
};

const MenuSection = ({ titleTransId, items }: MenuSectionProps) => {
    return (
        <nav>
            <List
                subheader={
                    titleTransId && (
                        <>
                            <Divider />
                            <ListSubheader id="menu-section-title" data-testid="menu-section-title">
                                <FormattedMessage id={titleTransId} />
                            </ListSubheader>
                        </>
                    )
                }
                aria-labelledby="menu-section-title"
                disablePadding
            >
                {items.map((item) => (
                    <ListItem
                        disablePadding
                        secondaryAction={<TaskCounter value={item.tasksCount} />}
                        key={item.href.$}
                    >
                        {/* @ts-ignore */}
                        <ListItemButton component={NavLink} to={item.href}>
                            <ListItemText>
                                {"titleTransId" in item ? (
                                    <FormattedMessage id={item.titleTransId} />
                                ) : (
                                    item.title
                                )}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </nav>
    );
};

export default MenuSection;
