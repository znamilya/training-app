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
import useProjects from "../../../hooks/controllers/useProjects";

type ProjectMenuSectionItemProps = {
    projectId: ProjectId;
};

const ProjectMenuSectionItem = ({ projectId }: ProjectMenuSectionItemProps) => {
    const { selectProjectById, selectUncompletedTasksCount } = useProjects();
    const project = selectProjectById(projectId);

    if (!project) return null;

    return (
        <MenuSectionItem
            icon={<FormatListBulletedIcon />}
            title={project.title}
            href={routes.project({ projectId: project.id })}
            tasksCount={selectUncompletedTasksCount(projectId)}
        />
    );
};

const SidebarModule = () => {
    // const { selectTasksTotalCount } = useInbox();
    const { selectNextActionTasks, selectAllActiveProjectsIds, selectAllProjectsTotalCount } =
        useProjects();
    const xxx = selectNextActionTasks();

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
                <MenuSectionItem
                    icon={<DoubleArrowIcon />}
                    titleTransId="SidebarModule.NextTasks"
                    href={routes.today({})}
                    tasksCount={xxx.length}
                />
                <MenuSectionItem
                    icon={<ListAltIcon />}
                    titleTransId="SidebarModule.AllProjects"
                    href={routes.projects({})}
                    tasksCount={selectAllProjectsTotalCount()}
                />
                <MenuSectionItem
                    icon={<ListAltIcon />}
                    titleTransId="SidebarModule.Categories"
                    href={routes.categories({})}
                    disableCounter
                />
            </MenuSection>
            <MenuSection titleTransId="SidebarModule.ActiveProjects">
                {selectAllActiveProjectsIds().map((projectId) => (
                    <ProjectMenuSectionItem projectId={projectId} />
                ))}
            </MenuSection>
        </RootStyled>
    );
};

export default SidebarModule;
