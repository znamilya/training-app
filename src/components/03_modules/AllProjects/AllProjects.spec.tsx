import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { byTestId, byText, byRole } from "testing-library-selector";

import { rootReducer, RootState } from "../../../store/store";

import AllProjects from "./AllProjects";
import { createProject } from "../../../enteties/project/factory";
import { setupServer } from "../../../utils/test";

type StoreParams = {
    preloadedState: Partial<{
        collections: Partial<RootState["collections"]>;
        enteties: Partial<RootState["enteties"]>;
    }>;
};

const renderComponent = (storeParams: StoreParams = {} as StoreParams) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: storeParams.preloadedState,
    });
    const utils = render(
        <Provider store={store}>
            <MemoryRouter>
                <AllProjects />
            </MemoryRouter>
        </Provider>,
    );

    return {
        ...utils,
        emptyMessage: byText(/No projects yet/),
        loadingSpinner: byTestId("all-projects-spinner"),
        errorMessage: byTestId("all-projects-error"),
        addProjectButton: byRole("button", { name: "Add Project" }),
        projectsList: byRole("list"),
        projectsItems: byRole("listitem"),
    };
};

const expectOnlySpinnerToBeTheDocument = (utils: ReturnType<typeof renderComponent>) => {
    expect(utils.loadingSpinner.get()).toBeInTheDocument();
    expect(utils.errorMessage.query()).not.toBeInTheDocument();
    expect(utils.emptyMessage.query()).not.toBeInTheDocument();
    expect(utils.projectsList.query()).not.toBeInTheDocument();
    expect(utils.addProjectButton.query()).not.toBeInTheDocument();
};

describe("Render", () => {
    describe("When there are no projects", () => {
        it("renders empty state", async () => {
            const { closeServer } = setupServer({
                response: [],
            });
            const utils = renderComponent();
            const { loadingSpinner, errorMessage, emptyMessage, projectsList, addProjectButton } =
                utils;

            expectOnlySpinnerToBeTheDocument(utils);

            // Wait for projects to load
            await waitForElementToBeRemoved(loadingSpinner.query());
            expect(errorMessage.query()).not.toBeInTheDocument();
            expect(emptyMessage.get()).toBeInTheDocument();
            expect(projectsList.query()).not.toBeInTheDocument();
            expect(addProjectButton.get()).toBeInTheDocument();
            closeServer();
        });
    });

    describe("When there are some projects", () => {
        it("renders list of projects", async () => {
            const project1 = createProject();
            const project2 = createProject();
            const { closeServer } = setupServer({
                response: [project1, project2],
            });
            const utils = renderComponent();
            const {
                loadingSpinner,
                errorMessage,
                emptyMessage,
                projectsList,
                projectsItems,
                addProjectButton,
            } = utils;

            expectOnlySpinnerToBeTheDocument(utils);

            // Wait for projects to load
            await waitForElementToBeRemoved(loadingSpinner.query());
            expect(errorMessage.query()).not.toBeInTheDocument();
            expect(emptyMessage.query()).not.toBeInTheDocument();
            expect(projectsList.get()).toBeInTheDocument();
            expect(addProjectButton.get()).toBeInTheDocument();
            expect(projectsItems.getAll()).toHaveLength(2);
            expect(projectsItems.getAll()[0]).toHaveTextContent(project1.title);
            expect(projectsItems.getAll()[1]).toHaveTextContent(project2.title);
            closeServer();
        });
    });

    describe("When an error occured during loading", () => {
        it("renders error message", async () => {
            const { closeServer } = setupServer({
                delay: 100,
                status: 500,
                response: null,
            });
            const utils = renderComponent();
            const { loadingSpinner, errorMessage, emptyMessage, projectsList, addProjectButton } =
                utils;

            expectOnlySpinnerToBeTheDocument(utils);

            // Wait for loading projects to fail
            expect(await errorMessage.find()).toBeInTheDocument();
            expect(loadingSpinner.query()).not.toBeInTheDocument();
            expect(emptyMessage.query()).not.toBeInTheDocument();
            expect(projectsList.query()).not.toBeInTheDocument();
            expect(addProjectButton.query()).not.toBeInTheDocument();
            closeServer();
        });
    });
});
