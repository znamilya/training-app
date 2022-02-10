import { useLayoutEffect } from "react";
import { useHistory } from "react-router";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";

import routes from "../../../routes";
import { ProjectId } from "../../../enteties/project/types";
import * as projectEnteties from "../../../store/entities/projects";
import { useAppDispatch } from "../../../store/store";
import { useProject } from "../../../store/entities/projects";
import PageTitle from "../../01_basic/PageTitle";
import TasksList, { TasksListItem } from "../../01_basic/TasksList";
import { TaskId } from "../../../enteties/task";
import { useTask } from "../../../store/entities/tasks";

type ProjectDetailsModuleProps = {
    projectId: ProjectId;
};

/**
 * Displays info about project (its title, tasks, etc) with ability to edit it.
 */
const ProjectDetailsModule = ({ projectId }: ProjectDetailsModuleProps) => {
    const {
        data: project,
        error,
        isLoading,
        isRenaming,
        isRemoving,
        isStarting,
        isStoping,
        fetch,
        rename,
        start,
        stop,
    } = useProject(projectId);
    const task = useTask();
    const history = useHistory();
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        fetch(projectId);
    }, [fetch, projectId]);

    const handleStartButtonClick = () => {
        start(projectId);
    };

    const handleStopButtonClick = () => {
        stop(projectId);
    };

    const handleRenameButtonClick = () => {
        const newTitle = prompt("New title");

        if (!newTitle) return;

        rename(projectId, newTitle);
    };

    const handleRemoveButtonClick = async () => {
        await dispatch(
            projectEnteties.actions.remove({
                projectId,
            }),
        );

        history.push(routes.projects({}).$);
    };

    const handleAddTask = async (title: string, onSuccess: () => void, onError: () => void) => {
        task.create({ projectId, title })
            .then(() => {
                onSuccess();
            })
            .catch(() => onError);
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!project) {
        // TODO: Handle absent project
        return <PageTitle>Unknown project</PageTitle>;
    }

    const shouldDisableButtons = isRenaming || isRemoving || isStarting || isStoping;

    return (
        <>
            <Stack direction="row" spacing={2} mb={2}>
                {project.isActive ? (
                    // STOP BUTTON
                    <LoadingButton
                        startIcon={<PauseIcon />}
                        disabled={shouldDisableButtons}
                        loading={isStoping}
                        onClick={handleStopButtonClick}
                    >
                        Stop
                    </LoadingButton>
                ) : (
                    // START BUTTON
                    <LoadingButton
                        startIcon={<PlayArrowIcon />}
                        disabled={shouldDisableButtons}
                        loading={isStarting}
                        onClick={handleStartButtonClick}
                    >
                        Start
                    </LoadingButton>
                )}

                {/* RENAME BUTTON */}
                <LoadingButton
                    startIcon={<EditIcon />}
                    disabled={shouldDisableButtons}
                    loading={isRenaming}
                    onClick={handleRenameButtonClick}
                >
                    Rename
                </LoadingButton>

                {/* REMOVE BUTTON */}
                <LoadingButton
                    disabled={shouldDisableButtons}
                    loading={isRemoving}
                    onClick={handleRemoveButtonClick}
                >
                    Remove
                </LoadingButton>
            </Stack>

            <TasksList onTaskAdd={handleAddTask}>
                {project.tasks.map((taskId) => (
                    <TaskListItemConnected taskId={taskId} key={taskId} />
                ))}
            </TasksList>
        </>
    );
};

const TaskListItemConnected = ({ taskId }: { taskId: TaskId }) => {
    const { data: task, remove, complete, isRemoving } = useTask(taskId);

    if (!task) return null;

    return (
        <TasksListItem
            id={taskId}
            title={task.title}
            isComplete={task.isComplete}
            isNextAction={task.isNextAction}
            isRemoving={isRemoving}
            onComplete={complete}
            onStart={() => {}}
            onStop={() => {}}
            onRemove={remove}
            key={taskId}
        />
    );
};

export default ProjectDetailsModule;
