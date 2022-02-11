import routes from "../../src/routes";

import BasePage from "./BasePage";

class MainPage extends BasePage {
    constructor({ page }) {
        super({
            page,
            url: routes.main({}).$,
        });
    }
}

export default MainPage;
