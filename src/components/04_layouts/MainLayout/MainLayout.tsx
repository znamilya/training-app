import { Typography } from "@mui/material";
import { ReactNode } from "react";

import { HeaderStyled, ContentStyled } from "./MainLayout.styled";

type MainLayoutProps = {
    title: string;
    children: ReactNode;
};

const MainLayout = ({ title, children }: MainLayoutProps) => {
    return (
        <main>
            <HeaderStyled>
                <Typography variant="h3" component="h1">
                    {title}
                </Typography>
            </HeaderStyled>
            <ContentStyled>{children}</ContentStyled>
        </main>
    );
};

export default MainLayout;
