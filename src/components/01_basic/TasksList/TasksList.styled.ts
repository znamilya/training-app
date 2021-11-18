import { Stack, styled } from "@mui/material";

import { resetList } from "../../../styles/mixins";

export const RootStyled = styled(Stack)({
    ...resetList(),
});
