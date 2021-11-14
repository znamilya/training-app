import { Drawer, styled } from "@mui/material";

export const SIDEBAR_WIDTH = 240;

export const RootStyled = styled(Drawer)({
    width: SIDEBAR_WIDTH,
    flexShrink: 0,

    "& .MuiDrawer-paper": {
        width: SIDEBAR_WIDTH,
        boxSizing: "border-box",
    },
});
