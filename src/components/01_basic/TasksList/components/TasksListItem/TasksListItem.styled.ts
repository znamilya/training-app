import { Checkbox, Paper, styled } from "@mui/material";

export const RootStyled = styled(Paper)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(1),
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

export const ActionsStyled = styled("div")({
    alignSelf: "start",
    marginLeft: "auto",
});
