import { useHistory } from "react-router";
import { Button, Stack } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";

import { ProjectId } from "../../../enteties/project/types";
import * as projectEnteties from "../../../store/entities/projects";
// import TasksList, { TasksListItem } from "../../01_basic/TasksList";
import routes from "../../../routes";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import PageTitle from "../../01_basic/PageTitle";
import { unwrapEntityEnvelope } from "../../../store/utils";

type ProjectDetailsModuleProps = {
    projectId: ProjectId;
};

/**
 * Displays info about project (its title, tasks, etc) with ability to edit it.
 */
const ProjectDetailsModule = ({ projectId }: ProjectDetailsModuleProps) => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const projectEnvelope = useAppSelector(projectEnteties.selectors.selectById(projectId));
    // const tasksIds = selectProjectTasksIds(projectId);

    // const handleTaskAdd = useCallback(
    //     (title: string) => {
    //         createTask({ projectId, title });
    //     },
    //     [createTask, projectId],
    // );
    const handleStartButtonClick = () => {
        dispatch(projectEnteties.actions.start({ projectId }));
    };

    const handleStopButtonClick = () => {
        dispatch(projectEnteties.actions.stop({ projectId }));
    };

    const handleRenameButtonClick = () => {
        const newTitle = prompt("New title");

        if (newTitle) {
            dispatch(projectEnteties.actions.rename({ projectId, newTitle }));
        }
    };

    const handleRemoveButtonClick = () => {
        dispatch(projectEnteties.actions.remove({ projectId }));

        history.push(routes.projects({}).$);
    };

    if (!projectEnvelope) {
        // TODO: Handle absent project
        return <PageTitle>Unknown project</PageTitle>;
    }

    const project = unwrapEntityEnvelope(projectEnvelope);

    return (
        <>
            <Stack direction="row" spacing={2} mb={2}>
                {project.isActive ? (
                    // STOP BUTTON
                    <Button startIcon={<PauseIcon />} onClick={handleStopButtonClick}>
                        Stop
                    </Button>
                ) : (
                    // START BUTTON
                    <Button startIcon={<PlayArrowIcon />} onClick={handleStartButtonClick}>
                        Start
                    </Button>
                )}

                {/* RENAME BUTTON */}
                <Button startIcon={<EditIcon />} onClick={handleRenameButtonClick}>
                    Rename
                </Button>

                {/* REMOVE BUTTON */}
                <Button onClick={handleRemoveButtonClick}>Remove</Button>
            </Stack>

            <div>ProjectTasksList</div>
        </>
    );
};

export default ProjectDetailsModule;
