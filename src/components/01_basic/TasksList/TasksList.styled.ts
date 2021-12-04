import { Stack, styled } from "@mui/material";

import { resetList } from "../../../styles/mixins";

export const ItemsStyled = styled(Stack)({
    ...resetList(),
});

export const ActionsStyled = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(2),
}));
