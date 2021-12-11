import React from "react";
import { render } from "@testing-library/react";
import { rest } from "msw";
import { setupServer as setupMSWServer } from "msw/node";
import { byTestId } from "testing-library-selector";
import { IntlProvider } from "react-intl";

import enMessages from "../translations/en.json";
import { DeepPartial } from "utility-types";

export const suppressRenderError = () => {
    jest.spyOn(console, "error")
        .mockImplementationOnce(() => jest.fn())
        .mockImplementationOnce(() => jest.fn());
};

// type CreateRendererParams<T> = {
//     Component: React.ComponentType<T>;
//     defaultProps: T;
//     locators: (props: T) => Record<string, () => ReturnType<typeof byTestId>>;
// };

// export const createRenderer = <T extends object, L extends Function>({
//     Component,
//     defaultProps,
//     locators: L,
// }: CreateRendererParams<T>): ((props: DeepPartial<T>) => ReturnType<typeof L>) => {
//     return (props: DeepPartial<T>) => {
//         const utils = render(
//             <IntlProvider locale="en" messages={enMessages}>
//                 <Component {...defaultProps} {...props} />
//             </IntlProvider>,
//         );

//         return {
//             // ...utils,
//             locators,
//         };
//     };
// };

export const setupServer = ({
    delay,
    status = 200,
    response = [],
}: {
    delay?: number;
    status?: number;
    response: any;
}) => {
    const handlers = [
        rest.get("https://jsonplaceholder.typicode.com/todos", async (_, res, ctx) => {
            if (delay) {
                await ctx.delay(delay);
            }

            return res(ctx.status(status), ctx.json(response));
        }),
    ];
    const server = setupMSWServer(...handlers);
    server.listen();

    return {
        closeServer: () => {
            server.resetHandlers();
            server.close();
        },
    };
};
