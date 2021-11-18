import { ReactNode } from "react";
import { RootStyled } from "./PageWrapper.styled";

type PageWrapperProps = {
    children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
    return <RootStyled>{children}</RootStyled>;
};

export default PageWrapper;
