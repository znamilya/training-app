import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";

import { suppressRenderError } from "../../../utils/test";
import enMessages from "../../../translations/en.json";

import LangSwitch, { LangSwitchProps } from "./LangSwitch";

const renderComponent = (props?: Partial<LangSwitchProps>) => {
    const defaultProps = {
        currentLang: "en" as "en",
        onChange: () => {},
    };

    const result = render(
        <IntlProvider locale="en" messages={enMessages}>
            <LangSwitch {...defaultProps} {...props} />
        </IntlProvider>,
    );

    return {
        ...result,
        rootNode: result.container.firstChild,
        getButton: () => screen.getByTestId("lang-switch-button"),
        queryMenu: () => screen.queryByTestId("lang-switch-menu"),
    };
};

describe("Render", () => {
    it("should render current lang", () => {
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

    it("should throw an error if current lang is not present in available langs", () => {
        suppressRenderError();

        expect(() => {
            // @ts-ignore
            renderComponent({ currentLang: "xx" });
        }).toThrow();
    });
});

describe("Select lang", () => {
    it("should trigger onChange callback with selected lang", () => {
        const onChange = jest.fn();
        const { getButton } = renderComponent({
            currentLang: "en",
            onChange,
        });

        userEvent.click(getButton());
        const ruLangItem = screen.getByText("Russian");
        userEvent.click(ruLangItem);

        expect(onChange).toHaveBeenCalledWith("ru");
    });

    it("should close menu after selecting new lang", async () => {
        const onChange = jest.fn();
        const { getButton, queryMenu } = renderComponent({
            currentLang: "en",
            onChange,
        });

        userEvent.click(getButton());
        const ruLangItem = screen.getByText("Russian");
        userEvent.click(ruLangItem);

        await waitForElementToBeRemoved(() => queryMenu());
    });
});
