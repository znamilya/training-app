import { ReactNode } from "react";

import PageTitle from "../../01_basic/PageTitle";

import { HeaderStyled, ContentStyled } from "./MainLayout.styled";

type MainLayoutProps = {
    title: string | ReactNode;
    children: ReactNode;
};

const MainLayout = ({ title, children }: MainLayoutProps) => {
    return (
        <main>
            <HeaderStyled>
                <PageTitle>{title}</PageTitle>
            </HeaderStyled>
            <ContentStyled>{children}</ContentStyled>
        </main>
    );
};

export default MainLayout;
