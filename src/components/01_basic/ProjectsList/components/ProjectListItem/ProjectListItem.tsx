import { Link } from "typesafe-routes/react-router";

import routes from "../../../../../routes";
import { ProjectId } from "../../../../../enteties/project/types";

import { RootStyled, PaperStyled, LinkStyled } from "./ProjectListItem.styled";
import CategoryChip from "../../../CategoryChip";

type ProjectListItemProps = {
    id: ProjectId;
    title: string;
};

const ProjectListItem = ({ id, title }: ProjectListItemProps) => {
    return (
        <RootStyled>
            <PaperStyled component={Link} to={routes.project({ projectId: id })} elevation={1}>
                <LinkStyled>{title}</LinkStyled>
                <CategoryChip label="Programming" />
            </PaperStyled>
        </RootStyled>
    );
};

export default ProjectListItem;
