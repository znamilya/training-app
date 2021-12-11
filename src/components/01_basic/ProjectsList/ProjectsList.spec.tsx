import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { byRole, byText } from "testing-library-selector";

import routes from "../../../routes";
import { generateProjectTitle } from "../../../enteties/project/factory";

import ProjectListItem from "./components/ProjectListItem";
import ProjectsList, { ProjectsListProps } from "./ProjectsList";

const routesProjectSpy = jest.spyOn(routes, "project");

const renderComponent = (props: Partial<ProjectsListProps>) => {
    const defaultProps = {
        children: [],
        onProjectAdd: () => {},
    };

    const utils = render(
        <MemoryRouter>
            <ProjectsList {...defaultProps} {...props} />
        </MemoryRouter>,
    );

    return {
        ...utils,
        list: byRole("list"),
        items: byRole("listitem"),
        itemLink: byRole("link"),
        emptyMessage: byText("No projects yet..."),
        projectButton: byRole("button", { name: "Add Project" }),
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

            const { list, items, itemLink } = renderComponent({
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
            const itemsElems = items.getAll();

            expect(list.get()).toBeInTheDocument();
            expect(itemsElems).toHaveLength(2);
            expect(itemsElems[0]).toHaveTextContent(projects[0].title);
            expect(itemLink.get(itemsElems[0])).toHaveAttribute(
                "href",
                `/projects/${projects[0].id}`,
            );
            expect(itemsElems[1]).toHaveTextContent(projects[1].title);
            expect(itemLink.get(itemsElems[1])).toHaveAttribute(
                "href",
                `/projects/${projects[1].id}`,
            );
        });

        it("doesn't render empty message", () => {
            const { emptyMessage } = renderComponent({
                children: [
                    <ProjectListItem id="1" title="Project A" key="1" />,
                    <ProjectListItem id="2" title="Project B" key="2" />,
                ],
            });

            expect(emptyMessage.query()).not.toBeInTheDocument();
        });

        it("renders add project button", () => {
            const { projectButton } = renderComponent({
                children: [
                    <ProjectListItem id="1" title="Project A" key="1" />,
                    <ProjectListItem id="2" title="Project B" key="2" />,
                ],
            });

            expect(projectButton.get()).toBeInTheDocument();
        });
    });

    describe("When there are no projects", () => {
        it("doesn't render projects list", () => {
            const { list } = renderComponent({
                children: [],
            });

            expect(list.query()).not.toBeInTheDocument();
        });

        it("renders empty message", () => {
            const { emptyMessage } = renderComponent({
                children: [],
            });

            expect(emptyMessage.get()).toBeInTheDocument();
        });

        it("renders add project button", () => {
            const { projectButton } = renderComponent({
                children: [],
            });

            expect(projectButton.get()).toBeInTheDocument();
        });
    });
});

describe("Add project", () => {
    it("allows to add a project", () => {
        const PROJECT_TITLE = generateProjectTitle();
        const ON_PROJECT_ADD = jest.fn();

        const { projectButton } = renderComponent({
            onProjectAdd: ON_PROJECT_ADD,
        });

        userEvent.click(projectButton.get());
        userEvent.type(screen.getByRole("textbox"), PROJECT_TITLE);
        userEvent.click(projectButton.get());

        expect(ON_PROJECT_ADD).toHaveBeenCalledWith(PROJECT_TITLE);
    });
});
