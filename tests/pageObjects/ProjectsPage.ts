import BasePage from "./BasePage";

import routes from "../../src/routes";

class ProjectsPage extends BasePage {
    constructor({ page }) {
        super({
            page,
            url: routes.projects({}).$,
        });
    }
}

export default ProjectsPage;
