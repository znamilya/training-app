import BasePage from "./BasePage";

import routes from "../../src/routes";

class ProjectDetailsPage extends BasePage {
    constructor({ page }) {
        super({
            page,
            url: routes.project({ projectId: "1" }).$,
        });
    }
}

export default ProjectDetailsPage;
