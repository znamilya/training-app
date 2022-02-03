import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { byTestId, byText, byRole } from "testing-library-selector";

import { rootReducer, RootState } from "../../../store/store";

import AllProjects from "./AllProjects";
import { createProject } from "../../../enteties/project/factory";
import { setupServer } from "../../../utils/test";
import ApiService from "../../../services/ApiService";
import ProjectsService from "../../../services/ProjectsService";

type StoreParams = {
    preloadedState: Partial<{
        collections: Partial<RootState["collections"]>;
        enteties: Partial<RootState["enteties"]>;
    }>;
};

const API_URL = "http://test.com";

const renderComponent = (storeParams: StoreParams = {} as StoreParams) => {
    const apiService = new ApiService({
        url: API_URL,
    });
    const projectsService = new ProjectsService({
        apiService,
    });
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: storeParams.preloadedState,
        middleware: [thunkMiddleware.withExtraArgument({ projectsService })],
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
    expect(utils.loadingSpinner.query()).toBeInTheDocument();
    expect(utils.errorMessage.query()).not.toBeInTheDocument();
    expect(utils.emptyMessage.query()).not.toBeInTheDocument();
    expect(utils.projectsList.query()).not.toBeInTheDocument();
    expect(utils.addProjectButton.query()).not.toBeInTheDocument();
};

describe("Render", () => {
    describe("When there are no projects", () => {
        it("renders empty state", async () => {
            const { closeServer } = setupServer({
                url: `${API_URL}/projects`,
                response: [],
            });
            const utils = renderComponent();
            const { loadingSpinner, errorMessage, emptyMessage, projectsList, addProjectButton } =
                utils;

            expectOnlySpinnerToBeTheDocument(utils);

            // Wait for projects to load
            await waitForElementToBeRemoved(loadingSpinner.query());
            expect(errorMessage.query()).not.toBeInTheDocument();
            expect(emptyMessage.query()).toBeInTheDocument();
            expect(projectsList.query()).not.toBeInTheDocument();
            expect(addProjectButton.query()).toBeInTheDocument();
            closeServer();
        });
    });

    describe("When there are some projects", () => {
        it("renders list of projects", async () => {
            const project1 = createProject();
            const project2 = createProject();
            const { closeServer } = setupServer({
                url: `${API_URL}/projects`,
                delay: 50,
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
            expect(projectsList.query()).toBeInTheDocument();
            expect(addProjectButton.query()).toBeInTheDocument();
            expect(projectsItems.queryAll()).toHaveLength(2);
            expect(projectsItems.queryAll()[0]).toHaveTextContent(project1.title);
            expect(projectsItems.queryAll()[1]).toHaveTextContent(project2.title);
            closeServer();
        });
    });

    describe("When an error occured during loading", () => {
        it("renders error message", async () => {
            const { closeServer } = setupServer({
                url: `${API_URL}/projects`,
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
