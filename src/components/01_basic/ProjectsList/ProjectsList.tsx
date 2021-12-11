import { Children, ReactNode } from "react";

import NewButton from "../NewButton";

import { ListStyled, ActionsStyled } from "./ProjectsList.styled";

export type ProjectsListProps = {
    children: ReactNode;
    onProjectAdd(projectTitle: string): void;
};

/**
 * Display a list of project with ability to add a new one.
 */
const ProjectsList = ({ children, onProjectAdd }: ProjectsListProps) => {
    const hasItems = Children.count(children) > 0;

    return (
        <>
            {hasItems ? <List /> : <EmptyMessage />}

            <ActionsStyled>
                <NewButton addButtonText="Add Project" onCreate={onProjectAdd} />
            </ActionsStyled>
        </>
    );

    function List() {
        return (
            <ListStyled spacing={1} component={"ul"}>
                {children}
            </ListStyled>
        );
    }

    function EmptyMessage() {
        return <div>No projects yet...</div>;
    }
};

export default ProjectsList;
