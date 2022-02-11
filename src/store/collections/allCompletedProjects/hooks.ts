import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";

import { load } from "./actions";
import { getSlice } from "./selectors";

export const useAllCompletedProjects = () => {
    const dispatch = useAppDispatch();
    const { ids, status, error, totalCount } = useAppSelector(getSlice);

    const loadHandler = useCallback(async () => dispatch(load()), [dispatch]);

    return {
        data: ids,
        totalCount,
        isLoading: status === "loading",
        error,
        load: loadHandler,
    };
};
