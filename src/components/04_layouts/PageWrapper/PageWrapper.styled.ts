import { styled } from "@mui/material";

import { SIDEBAR_WIDTH } from "../../03_modules/Sidebar/Sidebar.styled";

export const RootStyled = styled("main")(({ theme }) => ({
    marginLeft: SIDEBAR_WIDTH,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(9),
    background: theme.palette.grey["200"],

    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
        paddingTop: theme.spacing(11),
    },

    [theme.breakpoints.up("md")]: {
        padding: theme.spacing(4),
        paddingTop: theme.spacing(12),
    },
}));
