import { useCallback } from "react";
import type { Optional } from "utility-types";

import { Project, ProjectId } from "../../enteties/project/types";
import * as projectEnteties from "../../store/entities/projects";
import * as taskEnteties from "../../store/entities/tasks";
import * as allProjectsCollection from "../../store/collections/allProjects";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Task, TaskId } from "../../enteties/task";

type UseProjectsController = {
    fetchAllProjects(): void;
    createProject(title: string): void;
    renameProject(projectId: ProjectId, newTitle: string): void;
    removeProject(projectId: ProjectId): void;
    stopProject(projectId: ProjectId): void;
    startProject(projectId: ProjectId): void;
    createTask(task: Optional<Task, "id" | "isComplete" | "isNextAction">): void;
    renameTask(taskId: TaskId, newTitle: string): void;
    removeTask(taskId: TaskId, projectId?: ProjectId): void;
    selectAllProjectsIds(): ProjectId[];
    selectAllProjectsStatus(): string;
    selectAllActiveProjectsIds(): ProjectId[];
    selectAllProjectsTotalCount(): number;
    selectProjectById(projectId: ProjectId): Project | null;
    selectProjectTasksIds(projectId: ProjectId): TaskId[];
    selectTaskById(taskId: TaskId): Task | null;
    selectUncompletedTasksCount(projectId: ProjectId): number;
    selectNextActionTasks(): TaskId[];
};

const useProjects = (): UseProjectsController => {
    const selector = useAppSelector;
    const dispatch = useAppDispatch();

    const fetchAllProjects = useCallback<UseProjectsController["fetchAllProjects"]>(
        () => dispatch(allProjectsCollection.actions.load()),
        [dispatch],
    );

    const createProject = useCallback<UseProjectsController["createProject"]>(
        (title) =>
            dispatch(
                projectEnteties.actions.create({
                    title,
                }),
            ),
        [dispatch],
    );

    const removeProject = useCallback<UseProjectsController["removeProject"]>(
        (projectId) => dispatch(projectEnteties.actions.remove({ projectId })),
        [dispatch],
    );

    const renameProject = useCallback<UseProjectsController["renameProject"]>(
        (projectId, newTitle) => dispatch(projectEnteties.actions.rename({ projectId, newTitle })),
        [dispatch],
    );

    const stopProject = useCallback<UseProjectsController["stopProject"]>(
        (projectId) => dispatch(projectEnteties.actions.stop({ projectId })),
        [dispatch],
    );

    const startProject = useCallback<UseProjectsController["startProject"]>(
        (projectId) => dispatch(projectEnteties.actions.start({ projectId })),
        [dispatch],
    );

    const createTask = useCallback<UseProjectsController["createTask"]>(
        (task) => dispatch(taskEnteties.actions.create(task)),
        [dispatch],
    );

    const renameTask = useCallback<UseProjectsController["renameTask"]>(
        (taskId, newTitle) =>
            dispatch(
                taskEnteties.actions.rename({
                    taskId,
                    newTitle,
                }),
            ),
        [dispatch],
    );

    const removeTask = useCallback<UseProjectsController["removeTask"]>(
        (taskId, projectId) =>
            dispatch(
                taskEnteties.actions.remove({
                    taskId,
                    projectId,
                }),
            ),
        [dispatch],
    );

    const selectAllProjectsIds = useCallback<UseProjectsController["selectAllProjectsIds"]>(
        () => selector(allProjectsCollection.selectors.getIds),
        [selector],
    );

    const selectAllProjectsStatus = useCallback<UseProjectsController["selectAllProjectsStatus"]>(
        () => selector(allProjectsCollection.selectors.getStatus),
        [selector],
    );

    const selectAllActiveProjectsIds = useCallback<
        UseProjectsController["selectAllActiveProjectsIds"]
    >(() => selector(allProjectsCollection.selectors.selectAllActiveIds), [selector]);

    const selectAllProjectsTotalCount = useCallback<
        UseProjectsController["selectAllProjectsTotalCount"]
    >(() => selector(allProjectsCollection.selectors.selectTotalCount), [selector]);

    const selectProjectById = useCallback<UseProjectsController["selectProjectById"]>(
        (projectId) => selector(projectEnteties.selectors.selectById(projectId)),
        [selector],
    );

    const selectProjectTasksIds = useCallback<UseProjectsController["selectProjectTasksIds"]>(
        (projectId) => selector(projectEnteties.selectors.selectById(projectId))?.tasks || [],
        [selector],
    );

    const selectTaskById = useCallback<UseProjectsController["selectTaskById"]>(
        (taskId) => selector(taskEnteties.selectors.selectById(taskId)),
        [selector],
    );

    const selectUncompletedTasksCount = useCallback<
        UseProjectsController["selectUncompletedTasksCount"]
    >(
        (projectId) => selector(projectEnteties.selectors.selectUncompletedTasksCount(projectId)),
        [selector],
    );

    const selectNextActionTasks = useCallback<
        UseProjectsController["selectNextActionTasks"]
    >(() => {
        return [];
        // const state = selector((state) => state);
        // const projects = allProjectsCollection.selectors.selectAll(state);
        // const orphansProject = state.enteties.projects["1-orphans"];

        // return [...projects, orphansProject].reduce((acc, project) => {
        //     console.log(project);
        //     const tasksIds = project.tasks
        //         .map((taskId) => taskEnteties.selectors.selectById(taskId)(state))
        //         .filter((task) => task?.isNextAction)
        //         .map((task) => task?.id)
        //         .filter(notEmpty);

        //     return [...acc, ...tasksIds];
        // }, [] as TaskId[]);
    }, [selector]);

    return {
        fetchAllProjects,
        createProject,
        renameProject,
        removeProject,
        stopProject,
        startProject,
        createTask,
        renameTask,
        removeTask,
        selectAllProjectsIds,
        selectAllProjectsStatus,
        selectAllActiveProjectsIds,
        selectAllProjectsTotalCount,
        selectProjectById,
        selectProjectTasksIds,
        selectTaskById,
        selectUncompletedTasksCount,
        selectNextActionTasks,
    };
};

export default useProjects;
