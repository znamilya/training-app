import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";

import { load } from "./actions";
import { getSlice } from "./selectors";

export const useAllProjects = () => {
    const dispatch = useAppDispatch();
    const { ids, status, error } = useAppSelector(getSlice);

    const loadHandler = useCallback(async () => dispatch(load()), [dispatch]);

    return {
        data: ids,
        isLoading: status === "loading",
        error,
        load: loadHandler,
    };
};
