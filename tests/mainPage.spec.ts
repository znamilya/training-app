import { test, expect, Page } from "@playwright/test";

import routes from "../src/routes";

import MainPage from "./pageObjects/MainPage";

const BASE_URL = "http://localhost:3000";

test("redirects to ProjectsPage", async ({ page }) => {
    const mainPage = new MainPage({ page });

    await mainPage.visit();
    await page.waitForNavigation();

    expect(await page.url()).toBe(`${BASE_URL}${routes.projects({})}`);
});
