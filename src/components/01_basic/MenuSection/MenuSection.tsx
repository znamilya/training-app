import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListSubheader,
    Divider,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

export type MenuSectionItem = {
    href: string;
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
                    <ListItem disablePadding key={item.href}>
                        <ListItemButton component={"a"} href={item.href}>
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
