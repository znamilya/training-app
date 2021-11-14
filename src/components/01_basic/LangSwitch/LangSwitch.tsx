import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";

import { AvailableLangs } from "../../../types";
import ruSrc from "./images/ru.svg";
import enSrc from "./images/en.svg";
import { ImgWrapperStyled } from "./LangSwitch.styled";
import { FormattedMessage, useIntl } from "react-intl";

export type LangSwitchProps = {
    currentLang: AvailableLangs;
    onChange(lang: AvailableLangs): void;
};

const availableLangs = {
    en: {
        code: "en",
        imageSrc: enSrc,
        titleTransId: "LangSwitch.Items.English",
    },
    ru: {
        code: "ru",
        imageSrc: ruSrc,
        titleTransId: "LangSwitch.Items.Russian",
    },
};

const LangSwitch = ({ currentLang, onChange }: LangSwitchProps) => {
    const intl = useIntl();
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const currentLangDescriptor = availableLangs[currentLang];
    const isMenuOpen = Boolean(anchorEl);

    if (!currentLangDescriptor) {
        throw new Error(`Unknown lang ${currentLangDescriptor}`);
    }

    // HANDLERRS
    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (langCode: AvailableLangs) => {
        onChange(langCode);
        handleClose();
    };

    return (
        <div>
            <IconButton
                aria-controls="lang-switch-menu"
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
                data-testid="lang-switch-button"
                onClick={handleButtonClick}
            >
                <ImgWrapperStyled>
                    <img
                        src={currentLangDescriptor.imageSrc}
                        alt={intl.formatMessage({ id: currentLangDescriptor.titleTransId })}
                    />
                </ImgWrapperStyled>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                data-testid="lang-switch-menu"
                open={isMenuOpen}
                onClose={handleClose}
            >
                {Object.values(availableLangs).map((langDescriptor) => (
                    <MenuItem
                        onClick={() => handleItemClick(langDescriptor.code as AvailableLangs)}
                        key={langDescriptor.code}
                    >
                        <ListItemIcon>
                            <ImgWrapperStyled>
                                <img src={langDescriptor.imageSrc} alt={""} />
                            </ImgWrapperStyled>
                        </ListItemIcon>
                        <ListItemText>
                            <FormattedMessage id={langDescriptor.titleTransId} />
                        </ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default LangSwitch;
