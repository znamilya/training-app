import { Paper, styled } from "@mui/material";

export const RootStyled = styled(Paper)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(1),
}));
