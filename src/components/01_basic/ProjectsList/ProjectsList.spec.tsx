import { MemoryRouter } from "react-router";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import routes from "../../../routes";
import { generateProjectTitle } from "../../../entities/project/factory";

import ProjectListItem from "./components/ProjectListItem";
import ProjectsList, { ProjectsListProps } from "./ProjectsList";

const routesProjectSpy = jest.spyOn(routes, "project");

const renderComponent = (props: Partial<ProjectsListProps>) => {
    const defaultProps = {
        children: [],
        onProjectAdd: () => {},
    };

    const result = render(
        <MemoryRouter>
            <ProjectsList {...defaultProps} {...props} />
        </MemoryRouter>,
    );

    return {
        ...result,
        getList: () => screen.getByRole("list"),
        queryList: () => screen.queryByRole("list"),
        getItems: () => screen.getAllByRole("listitem"),
        getItemLink: (scope: HTMLElement) => within(scope).getByRole("link"),
        getEmptyMessage: () => screen.getByText("No projects yet..."),
        queryEmptyMessage: () => screen.queryByText("No projects yet..."),
        getAddProjectButton: () =>
            screen.getByRole("button", {
                name: "Add Project",
            }),
    };
};

describe("Render", () => {
    describe("When there are a few projects", () => {
        afterEach(() => {
            routesProjectSpy.mockRestore();
        });

        it("renders projects list", () => {
            routesProjectSpy.mockImplementation(({ projectId }) => ({
                $: `/projects/${projectId}`,
            }));
            const projects = [
                { id: "1", title: generateProjectTitle() },
                { id: "2", title: generateProjectTitle() },
            ];

            const { getList, getItems, getItemLink } = renderComponent({
                children: [
                    <ProjectListItem
                        id={projects[0].id}
                        title={projects[0].title}
                        key={projects[0].id}
                    />,
                    <ProjectListItem
                        id={projects[1].id}
                        title={projects[1].title}
                        key={projects[1].id}
                    />,
                ],
            });
            const items = getItems();

            expect(getList()).toBeInTheDocument();
            expect(items).toHaveLength(2);
            expect(items[0]).toHaveTextContent(projects[0].title);
            expect(getItemLink(items[0])).toHaveAttribute("href", `/projects/${projects[0].id}`);
            expect(items[1]).toHaveTextContent(projects[1].title);
            expect(getItemLink(items[1])).toHaveAttribute("href", `/projects/${projects[1].id}`);
        });

        it("doesn't render empty message", () => {
            const { queryEmptyMessage } = renderComponent({
                children: [
                    <ProjectListItem id="1" title="Project A" key="1" />,
                    <ProjectListItem id="2" title="Project B" key="2" />,
                ],
            });

            expect(queryEmptyMessage()).not.toBeInTheDocument();
        });

        it("renders add project button", () => {
            const { getAddProjectButton } = renderComponent({
                children: [
                    <ProjectListItem id="1" title="Project A" key="1" />,
                    <ProjectListItem id="2" title="Project B" key="2" />,
                ],
            });

            expect(getAddProjectButton()).toBeInTheDocument();
        });
    });

    describe("When there are no projects", () => {
        it("doesn't render projects list", () => {
            const { queryList } = renderComponent({
                children: [],
            });

            expect(queryList()).not.toBeInTheDocument();
        });

        it("renders empty message", () => {
            const { getEmptyMessage } = renderComponent({
                children: [],
            });

            expect(getEmptyMessage()).toBeInTheDocument();
        });

        it("renders add project button", () => {
            const { getAddProjectButton } = renderComponent({
                children: [
                    <ProjectListItem id="1" title="Project A" key="1" />,
                    <ProjectListItem id="2" title="Project B" key="2" />,
                ],
            });

            expect(getAddProjectButton()).toBeInTheDocument();
        });
    });
});

describe("Add project", () => {
    describe("When new project form is submitted", () => {
        it("Calls onProjectAdd callback", () => {
            const PROJECT_TITLE = generateProjectTitle();
            const ON_PROJECT_ADD = jest.fn();

            const { getAddProjectButton } = renderComponent({
                onProjectAdd: ON_PROJECT_ADD,
            });

            userEvent.click(getAddProjectButton());
            userEvent.type(screen.getByRole("textbox"), PROJECT_TITLE);
            userEvent.click(getAddProjectButton());

            expect(ON_PROJECT_ADD).toHaveBeenCalledWith(PROJECT_TITLE);
        });
    });
});
