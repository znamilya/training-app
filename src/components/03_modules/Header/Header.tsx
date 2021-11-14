import { AppBar, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import useAppController from "../../../hooks/controllers/useAppController";

import LangSwitch from "../../01_basic/LangSwitch";

const HeaderModule = () => {
    const { lang, setLang } = useAppController();

    return (
        <AppBar>
            <Toolbar>
                <Box sx={{ flex: 1 }} />
                <LangSwitch currentLang={lang} onChange={setLang} />
            </Toolbar>
        </AppBar>
    );
};

export default HeaderModule;
