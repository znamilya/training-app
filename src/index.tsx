import React from "react";
import ReactDOM from "react-dom";

import App from "./components/06_App/App";
import { AppProvider } from "./contexts/app";

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
