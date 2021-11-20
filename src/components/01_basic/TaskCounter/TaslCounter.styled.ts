import { styled } from "@mui/material";

export const RootStyled = styled("span")(({ theme }) => ({
    display: "inline-block",
    color: theme.palette.grey["500"],
    ...theme.typography.body2,
}));
