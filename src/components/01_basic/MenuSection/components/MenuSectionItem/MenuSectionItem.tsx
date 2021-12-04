import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "typesafe-routes/react-router";
import { FormattedMessage } from "react-intl";
import CheckIcon from "@mui/icons-material/Check";

import TaskCounter from "../../../TaskCounter";
import { ReactNode } from "react";

export type MenuSectionItemProps = {
    href: { $: string };
    icon?: ReactNode;
    tasksCount: number;
} & (
    | {
          title: string;
      }
    | {
          titleTransId: string;
      }
);
const MenuSectionItem = ({ href, icon, tasksCount, ...props }: MenuSectionItemProps) => {
    const secondaryAction =
        tasksCount === 0 ? <CheckIcon color="success" /> : <TaskCounter value={tasksCount} />;

    return (
        <ListItem disablePadding secondaryAction={secondaryAction} key={href.$}>
            {/* @ts-ignore */}
            <ListItemButton component={NavLink} to={href}>
                {icon && <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>}
                <ListItemText>
                    {"titleTransId" in props ? (
                        <FormattedMessage id={props.titleTransId} />
                    ) : (
                        props.title
                    )}
                </ListItemText>
            </ListItemButton>
        </ListItem>
    );
};

export default MenuSectionItem;
