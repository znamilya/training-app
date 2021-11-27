import { memo } from "react";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import useAppController from "../../../hooks/controllers/useAppController";

import LangSwitch from "../../01_basic/LangSwitch";

import { RootStyled } from "./Header.styled";

const HeaderModule = () => {
    const { lang, setLang } = useAppController();

    return (
        <RootStyled>
            <Toolbar>
                <Box sx={{ flex: 1 }} />
                <LangSwitch currentLang={lang} onChange={setLang} />
            </Toolbar>
        </RootStyled>
    );
};

export default memo(HeaderModule);
