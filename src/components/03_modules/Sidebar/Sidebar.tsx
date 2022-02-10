// import { Toolbar } from "@mui/material";
import { ProjectId } from "../../../enteties/project/types";
// import InboxIcon from "@mui/icons-material/Inbox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import routes from "../../../routes";
// import * as projectEnteties from "../../../store/enteties/projects";
import MenuSection, { MenuSectionItem } from "../../01_basic/MenuSection";

import { RootStyled } from "./Sidebar.styled";
// import useInbox from "../../../hooks/controllers/useInbox";
import { useAppSelector } from "../../../store/store";
import { useAllActiveProjects } from "../../../store/collections/allActiveProjects";
import * as allProjectsCollection from "../../../store/collections/allProjects";
import { unwrapEntityEnvelope } from "../../../store/utils";
import { useProject } from "../../../store/entities/projects";

type ProjectMenuSectionItemProps = {
    projectId: ProjectId;
};

const ProjectMenuSectionItem = ({ projectId }: ProjectMenuSectionItemProps) => {
    const project = useProject(projectId);

    if (!project.data) return null;

    return (
        <MenuSectionItem
            // icon={<FormatListBulletedIcon />}
            title={project.data.title}
            href={routes.project({ projectId: project.data.id })}
            tasksCount={project.data.tasks.length}
        />
    );
};

const SidebarModule = () => {
    const allProjectsTotalCount = useAppSelector(allProjectsCollection.selectors.selectTotalCount);
    const allActiveProjects = useAllActiveProjects();

    return (
        <RootStyled variant="permanent">
            {/* <Toolbar /> */}
            <MenuSection>
                {/* <MenuSectionItem
                    icon={<InboxIcon />}
                    titleTransId="SidebarModule.Inbox"
                    href={routes.inbox({})}
                    tasksCount={selectTasksTotalCount()}
                /> */}
                {/* <MenuSectionItem
                    icon={<DoubleArrowIcon />}
                    titleTransId="SidebarModule.NextTasks"
                    href={routes.today({})}
                    tasksCount={xxx.length}
                /> */}
                <MenuSectionItem
                    icon={<ListAltIcon />}
                    titleTransId="SidebarModule.AllProjects"
                    href={routes.projects({})}
                    tasksCount={allProjectsTotalCount}
                />
                {/* <MenuSectionItem
                    icon={<ListAltIcon />}
                    titleTransId="SidebarModule.Categories"
                    href={routes.categories({})}
                    disableCounter
                /> */}
            </MenuSection>
            <MenuSection titleTransId="SidebarModule.ActiveProjects">
                {allActiveProjects.data.map((projectId) => (
                    <ProjectMenuSectionItem projectId={projectId} />
                ))}
            </MenuSection>
        </RootStyled>
    );
};

export default SidebarModule;
