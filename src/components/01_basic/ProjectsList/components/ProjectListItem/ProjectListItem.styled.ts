import { Paper, styled } from "@mui/material";

export const RootStyled = styled("li")(({ theme }) => ({}));

export const LinkStyled = styled(Paper)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(1),
    textDecoration: "none",
}));
