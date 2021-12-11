import { IntlProvider } from "react-intl";
import { render } from "@testing-library/react";
import { byTestId, byRole } from "testing-library-selector";

import enMessages from "../../../translations/en.json";
// import { createRenderer } from "../../../utils/test";

import MenuSection, { MenuSectionProps } from "./MenuSection";

// eslint-disable-next-line testing-library/render-result-naming-convention
// const renderComponent = createRenderer<MenuSectionProps>({
//     Component: MenuSection,
//     defaultProps: {
//         children: "",
//     },
//     locators: (props) => ({
//         title: () => byTestId("menu-section-title"),
//         queryTitle: () => byTestId("menu-section-title"),
//         getList: () =>
//             byRole("list", {
//                 name: props.titleTransId,
//             }),
//         getItems: () => byRole("listitem"),
//     }),
// });

const renderComponent = (props: Partial<MenuSectionProps>) => {
    const defaultProps = {
        title: "",
        items: [],
        children: "",
    };

    const utils = render(
        <IntlProvider locale="en" messages={enMessages}>
            <MenuSection {...defaultProps} {...props} />
        </IntlProvider>,
    );

    return {
        ...utils,
        title: byTestId("menu-section-title"),
        getList: byRole("list", { name: props.titleTransId }),
    };
};

describe("Render", () => {
    describe("When title passed", () => {
        it("renders menu section", () => {
            const TITLE = "SidebarModule.Inbox";
            const { title } = renderComponent({
                titleTransId: TITLE,
            });

            expect(title.get()).toHaveTextContent("Inbox");
        });
    });

    describe("When no title passed", () => {
        it("renders menu section without title", () => {
            const { title } = renderComponent({
                titleTransId: undefined,
            });

            expect(title.query()).not.toBeInTheDocument();
        });
    });
});
