import { useCallback } from "react";

import { ProjectId } from "../../../enteties/project/types";
import { useAppDispatch, useAppSelector } from "../../store";

import { create } from "./actions";
import { selectById } from "./selectors";

export const useProject = (projectId: ProjectId = "") => {
    const dispatch = useAppDispatch();
    const envelope = useAppSelector(selectById(projectId));

    const createHandler = useCallback(
        async ({ title }: { title: string }) => dispatch(create({ title })),
        [dispatch],
    );

    return {
        data: envelope?.data || null,
        create: createHandler,
    };
};
