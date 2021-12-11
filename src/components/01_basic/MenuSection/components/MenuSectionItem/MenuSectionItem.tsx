import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "typesafe-routes/react-router";
import { FormattedMessage } from "react-intl";
import CheckIcon from "@mui/icons-material/Check";

import TaskCounter from "../../../TaskCounter";
import { ReactNode } from "react";

export type MenuSectionItemProps = {
    href: { $: string };
    icon?: ReactNode;
} & (
    | {
          disableCounter: true;
      }
    | {
          disableCounter?: false;
          tasksCount: number;
      }
) &
    (
        | {
              title: string;
          }
        | {
              titleTransId: string;
          }
    );
const MenuSectionItem = ({ href, icon, ...props }: MenuSectionItemProps) => {
    const secondaryAction = props.disableCounter ? null : props.tasksCount === 0 ? (
        <CheckIcon color="success" />
    ) : (
        <TaskCounter value={props.tasksCount} />
    );

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
