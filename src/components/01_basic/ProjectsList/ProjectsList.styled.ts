import { Stack, styled } from "@mui/material";

import { resetList } from "../../../styles/mixins";

export const RootStyled = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

export const ListStyled = styled(Stack)({
    ...resetList(),
});
