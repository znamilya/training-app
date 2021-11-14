import { AppBar, styled } from "@mui/material";

export const RootStyles = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));
