import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Typography,
    ListSubheader,
    Divider,
} from "@mui/material";

export type MenuSectionItem = {
    title: string;
    href: string;
};

export type MenuSectionProps = {
    title?: string;
    items: MenuSectionItem[];
};

const MenuSection = ({ title, items }: MenuSectionProps) => {
    return (
        <nav>
            <List
                subheader={
                    title && (
                        <>
                            <Divider />
                            <ListSubheader id="menu-section-title" data-testid="menu-section-title">
                                {title}
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
                            <ListItemText>{item.title}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </nav>
    );
};

export default MenuSection;
