import { IntlProvider } from "react-intl";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { byTestId } from "testing-library-selector";

import { suppressRenderError } from "../../../utils/test";
import enMessages from "../../../translations/en.json";

import LangSwitch, { LangSwitchProps } from "./LangSwitch";

const renderComponent = (props?: Partial<LangSwitchProps>) => {
    const defaultProps = {
        currentLang: "en" as "en",
        onChange: () => {},
    };

    const utils = render(
        <IntlProvider locale="en" messages={enMessages}>
            <LangSwitch {...defaultProps} {...props} />
        </IntlProvider>,
    );

    return {
        ...utils,
        // eslint-disable-next-line testing-library/no-node-access
        rootNode: utils.container.firstChild,
        triggerButton: byTestId("lang-switch-button"),
        menu: byTestId("lang-switch-menu"),
    };
};

describe("Render", () => {
    it("Renders current lang", () => {
        (
            [
                { code: "en", title: "English" },
                { code: "ru", title: "Russian" },
            ] as const
        ).forEach(({ code, title }) => {
            renderComponent({ currentLang: code });

            expect(screen.getByAltText(title)).toBeInTheDocument();
        });
    });

    it("When current lang is not present in available langs -- throws an error", () => {
        suppressRenderError();

        expect(() => {
            // @ts-ignore
            renderComponent({ currentLang: "xx" });
        }).toThrow();
    });
});

describe("Select lang", () => {
    describe("When new lang is selected", () => {
        it("Calls onChange callback", () => {
            const onChange = jest.fn();
            const { triggerButton } = renderComponent({
                currentLang: "en",
                onChange,
            });

            userEvent.click(triggerButton.get());
            userEvent.click(screen.getByText("Russian"));

            expect(onChange).toHaveBeenCalledWith("ru");
        });

        it("Closes menu", async () => {
            const onChange = jest.fn();
            const { triggerButton, menu } = renderComponent({
                currentLang: "en",
                onChange,
            });

            userEvent.click(triggerButton.get());
            // Select an option
            userEvent.click(screen.getByText("Russian"));

            expect(menu.query()).not.toBeInTheDocument();
        });
    });
});
