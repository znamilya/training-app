import { Paper, styled } from "@mui/material";
import { Link } from "typesafe-routes/react-router";

export const RootStyled = styled(Paper)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(1),
}));

export const CheckboxStyled = styled("div")({
    alignSelf: "start",
});

export const TitleWrapperStyled = styled("div")(({ theme }) => ({
    flex: 1,
    alignSelf: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
}));

export const TitleStyled = styled("div")(({ theme }) => ({}));

export const ActionsStyled = styled("div")({
    alignSelf: "start",
    marginLeft: "auto",
});

export const ProjectStyled = styled(Link)(({ theme }) => ({
    fontSize: "12px",
    color: theme.palette.grey["500"],
}));
