import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import ProjectTitle, { ProjectTitleProps } from "./ProjectTitle";
import { rootReducer, RootState } from "../../../store/store";
import { createProject } from "../../../enteties/project/factory";

type StoreParams = {
    preloadedState: Partial<{
        collections: Partial<RootState["collections"]>;
        enteties: Partial<RootState["enteties"]>;
    }>;
};

const renderComponent = (
    props: Partial<ProjectTitleProps>,
    storeParams: StoreParams = {} as StoreParams,
) => {
    const defaultProps = {
        projectId: "1",
    };

    const store = configureStore({
        reducer: rootReducer,
        preloadedState: storeParams.preloadedState,
    });

    const utils = render(
        <Provider store={store}>
            <ProjectTitle {...defaultProps} {...props} />
        </Provider>,
    );

    return {
        ...utils,
        rootNode: utils.container.firstChild,
    };
};

describe("Render", () => {
    describe("When there is a project with a given id", () => {
        it("renders project title", () => {
            const PROJECT_TITLE = "Project A";
            const PROJECT_ID = "100";
            const state = {
                enteties: {
                    projects: {
                        [PROJECT_ID]: {
                            status: "success",
                            data: createProject({
                                id: PROJECT_ID,
                                title: PROJECT_TITLE,
                            }),
                            error: null,
                            isStale: false,
                        },
                    },
                },
            };

            const { rootNode } = renderComponent(
                { projectId: PROJECT_ID },
                { preloadedState: state },
            );

            expect(rootNode).toHaveTextContent(PROJECT_TITLE);
        });
    });

    describe("When there is no a project with a given id", () => {
        it("renders null", () => {
            const PROJECT_ID = "100";
            const state = {
                enteties: {
                    projects: {},
                },
            };

            const { rootNode } = renderComponent(
                { projectId: PROJECT_ID },
                { preloadedState: state },
            );

            expect(rootNode).toBeNull();
        });
    });
});
