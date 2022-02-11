import { Children, ReactNode } from "react";

import NewButton from "../NewButton";

import { RootStyled, ListStyled } from "./ProjectsList.styled";

export type ProjectsListProps = {
    children: ReactNode;
    onProjectAdd?: (title: string, onSuccess: () => void, onError: () => void) => void;
};

/**
 * Display a list of project with ability to add a new one.
 */
const ProjectsList = ({ children, onProjectAdd }: ProjectsListProps) => {
    const hasItems = Children.count(children) > 0;

    return (
        <RootStyled>
            {onProjectAdd && (
                <div>
                    <NewButton addButtonText="Add Project" onCreate={onProjectAdd} />
                </div>
            )}

            {hasItems ? (
                <ListStyled spacing={1} component={"ul"}>
                    {children}
                </ListStyled>
            ) : (
                <div>No projects yet...</div>
            )}
        </RootStyled>
    );
};

export default ProjectsList;
