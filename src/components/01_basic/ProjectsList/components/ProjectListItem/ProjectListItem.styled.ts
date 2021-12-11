import { Paper, styled } from "@mui/material";

export const RootStyled = styled("li")({});

export const PaperStyled = styled(Paper)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(1),
    textDecoration: "none",
}));

export const LinkStyled = styled("div")(({ theme }) => ({
    flex: 1,
}));
