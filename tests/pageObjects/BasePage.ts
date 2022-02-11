import { Page } from "playwright-core";

export type BasePageParams = {
    page: Page;
    url: string;
};

class BasePage {
    readonly #page: Page;
    readonly #url: string;

    constructor({ page, url }: BasePageParams) {
        this.#page = page;
        this.#url = `http://localhost:3000${url}`;
    }

    async visit() {
        await this.#page.goto(this.#url);
    }
}

export default BasePage;
