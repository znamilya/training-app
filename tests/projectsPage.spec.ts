import { test, expect, Page } from "@playwright/test";

import routes from "../src/routes";

import ProjectsPage from "./pageObjects/ProjectsPage";

test.describe("Visit", () => {
    test.describe.parallel("projects", () => {
        test("when there is no projects", async ({ page }) => {
            const projectsPage = new ProjectsPage({ page });

            await projectsPage.visit();
        });

        test("when there are some projects", () => {});
    });

    test.describe.parallel("active projects", () => {
        test("when there are no active projects", async ({ page }) => {
            const projectsPage = new ProjectsPage({ page });

            await projectsPage.visit();
        });

        test("when there are some active projects", async ({ page }) => {
            const projectsPage = new ProjectsPage({ page });

            await projectsPage.visit();
        });
    });
});
