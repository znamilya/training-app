import { NavLink } from "typesafe-routes/react-router";
import { FormattedMessage } from "react-intl";
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader,
    ListItemIcon,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CheckIcon from "@mui/icons-material/Check";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

import routes from "../../../routes";
import { ProjectId } from "../../../enteties/project/types";
import { useAppSelector } from "../../../store/store";
import { useAllActiveProjects } from "../../../store/collections/allActiveProjects";
import * as allProjectsCollection from "../../../store/collections/allProjects";
import { useProject } from "../../../store/entities/projects";
import { useAllCompletedProjects } from "../../../store/collections/allCompletedProjects";
import TaskCounter from "../../01_basic/TaskCounter";

import { RootStyled } from "./Sidebar.styled";
import { ReactNode } from "react";
import { useAllActiveTasks } from "../../../store/collections/allActiveTasks";

type ProjectMenuSectionItemProps = {
    projectId: ProjectId;
};

const ProjectMenuSectionItem = ({ projectId }: ProjectMenuSectionItemProps) => {
    const { data: project, selectCompletedTasksCount } = useProject(projectId);
    const completedTasksCount = selectCompletedTasksCount();

    if (!project) return null;

    return (
        <ListItem
            disablePadding
            secondaryAction={
                completedTasksCount === project.tasks.length ? (
                    <CheckIcon color="success" />
                ) : (
                    <TaskCounter value={completedTasksCount} totalCount={project.tasks.length} />
                )
            }
            key={project.id}
        >
            {/* @ts-ignore */}
            <ListItemButton component={NavLink} to={routes.project({ projectId: project.id })}>
                <ListItemText>{project.title}</ListItemText>
            </ListItemButton>
        </ListItem>
    );
};

export type MenuSectionItemProps = {
    href: { $: string };
    icon?: ReactNode;
    titleTransId: string;
    secondaryAction?: ReactNode;
};

const MenuSectionItem = ({ href, icon, secondaryAction, ...props }: MenuSectionItemProps) => {
    return (
        <ListItem disablePadding secondaryAction={secondaryAction} key={href.$}>
            {/* @ts-ignore */}
            <ListItemButton component={NavLink} to={href}>
                {icon && <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>}
                <ListItemText>
                    <FormattedMessage id={props.titleTransId} />
                </ListItemText>
            </ListItemButton>
        </ListItem>
    );
};

const SidebarModule = () => {
    const allProjectsTotalCount = useAppSelector(allProjectsCollection.selectors.selectTotalCount);
    const allActiveProjects = useAllActiveProjects();
    const allActiveTasks = useAllActiveTasks();
    const allCompletedProjects = useAllCompletedProjects();

    return (
        <RootStyled variant="permanent">
            {/* <Toolbar /> */}
            <List disablePadding>
                <MenuSectionItem
                    icon={<WbSunnyOutlinedIcon />}
                    titleTransId="SidebarModule.NextTasks"
                    href={routes.today({})}
                    secondaryAction={
                        <TaskCounter
                            value={allActiveTasks.selectCompletedCount()}
                            totalCount={allActiveTasks.totalCount}
                        />
                    }
                />
            </List>

            <Divider />

            <List
                subheader={
                    <ListSubheader id="menu-section-title" data-testid="menu-section-title">
                        <FormattedMessage id="SidebarModule.ActiveProjects" />
                    </ListSubheader>
                }
                aria-labelledby="menu-section-title"
            >
                {allActiveProjects.data.map((projectId) => (
                    <ProjectMenuSectionItem projectId={projectId} />
                ))}
            </List>

            <Divider />

            <List>
                <MenuSectionItem
                    icon={<ListAltIcon />}
                    titleTransId="SidebarModule.AllProjects"
                    href={routes.projects({})}
                    secondaryAction={<TaskCounter value={allProjectsTotalCount} />}
                />
                <MenuSectionItem
                    icon={<CheckIcon />}
                    titleTransId="SidebarModule.CompletedProjects"
                    href={routes.completedProjects({})}
                    secondaryAction={<TaskCounter value={allCompletedProjects.totalCount} />}
                />
            </List>
        </RootStyled>
    );
};

export default SidebarModule;
