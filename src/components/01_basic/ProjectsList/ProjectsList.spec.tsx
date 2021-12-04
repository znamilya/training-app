import { MemoryRouter } from "react-router";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import routes from "../../../routes";

import ProjectListItem from "./components/ProjectListItem";
import ProjectsList, { ProjectsListProps } from "./ProjectsList";

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
    it("When there are a few projects", () => {
        jest.spyOn(routes, "project").mockImplementation(({ projectId }) => ({
            $: `/projects/${projectId}`,
        }));
        const { getList, getItems, getItemLink, queryEmptyMessage } = renderComponent({
            children: [
                <ProjectListItem id="1" title="Project A" key="1" />,
                <ProjectListItem id="2" title="Project B" key="2" />,
            ],
        });

        const items = getItems();

        expect(getList()).toBeInTheDocument();
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent("Project A");
        expect(getItemLink(items[0])).toHaveAttribute("href", "/projects/1");
        expect(items[1]).toHaveTextContent("Project B");
        expect(getItemLink(items[1])).toHaveAttribute("href", "/projects/2");
        expect(queryEmptyMessage()).not.toBeInTheDocument();
    });

    it("When there are no projects", () => {
        const { queryList, getEmptyMessage } = renderComponent({
            children: [],
        });

        expect(queryList()).not.toBeInTheDocument();
        expect(getEmptyMessage()).toBeInTheDocument();
    });
});

describe("Add project", () => {
    it("Main success scenario", () => {
        const PROJECT_TITLE = "Project A";
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
