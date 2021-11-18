import { AppBar, styled } from "@mui/material";

export const RootStyled = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));
