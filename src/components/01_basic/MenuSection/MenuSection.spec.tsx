import { screen, render, within } from "@testing-library/react";
import MenuSection, { MenuSectionProps } from "./MenuSection";

const renderComponent = (props: Partial<MenuSectionProps>) => {
    const defaultProps = {
        title: "",
        items: [],
    };

    const result = render(<MenuSection {...defaultProps} {...props} />);

    return {
        ...result,
        getTitle: () => screen.getByTestId("menu-section-title"),
        queryTitle: () => screen.queryByTestId("menu-section-title"),
        getList: () =>
            screen.getByRole("list", {
                name: props.title,
            }),
        getItems: (list: HTMLElement) => within(list).getAllByRole("listitem"),
    };
};

describe("Render", () => {
    describe("Main success scenario", () => {
        const TITLE = "Projects";
        const ITEMS = [
            { title: "Project A", href: "/projects/1" },
            { title: "Project B", href: "/projects/2" },
        ];
        let wrapper: any;

        beforeEach(() => {
            wrapper = renderComponent({
                title: TITLE,
                items: ITEMS,
            });
        });

        it("Should render title", () => {
            const { getTitle } = wrapper;

            expect(getTitle()).toHaveTextContent(TITLE);
        });

        it("Should render items", () => {
            const { getItems, getList } = wrapper;
            const items = getItems(getList());

            // +1 because title is rendered as li element
            expect(items).toHaveLength(ITEMS.length + 1);

            ITEMS.forEach((ITEM, index) => {
                const actualIndex = index + 1;

                expect(items[actualIndex]).toHaveTextContent(ITEM.title);
                expect(screen.getByText(ITEM.title).closest("a")).toHaveAttribute(
                    "href",
                    ITEM.href,
                );
            });
        });
    });

    describe("When no title passed", () => {
        let wrapper: any;

        beforeEach(() => {
            wrapper = renderComponent({
                title: "",
                items: [{ title: "Project 1", href: "/" }],
            });
        });

        it("shouldn't render title", () => {
            const { queryTitle } = wrapper;

            expect(queryTitle()).not.toBeInTheDocument();
        });
    });
});
