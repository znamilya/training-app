import { styled } from "@mui/material";

export const HeaderStyled = styled("header")(({ theme }) => ({
    padding: theme.spacing(2),
    background: theme.palette.grey["300"],

    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
    },

    [theme.breakpoints.up("md")]: {
        padding: theme.spacing(4),
    },
}));

export const ContentStyled = styled("header")(({ theme }) => ({
    padding: theme.spacing(2),

    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
    },

    [theme.breakpoints.up("md")]: {
        padding: theme.spacing(4),
    },
}));
