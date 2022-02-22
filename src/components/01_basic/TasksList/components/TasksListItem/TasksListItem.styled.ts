import { Checkbox, Paper, styled } from "@mui/material";

export const RootStyled = styled(Paper)(({ theme }) => ({}));

export const InnerStyled = styled("li")(({ theme }) => ({
    display: "flex",
}));

export const ExtraStyled = styled("div")(({ theme }) => ({
    marginTop: `calc(-1 * ${theme.spacing(1.5)})`,
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
}));

export const CheckboxStyled = styled(Checkbox)({
    alignSelf: "start",
});

export const TitleWrapperStyled = styled("div")(({ theme }) => ({
    flex: 1,
    alignSelf: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
}));

export const TitleStyled = styled("div")(({ theme }) => ({}));

export const ActionsStyled = styled("div")(({ theme }) => ({
    marginLeft: "auto",
    padding: theme.spacing(1),
    alignSelf: "start",
}));
