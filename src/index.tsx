import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import store from "./store";
import { AppProvider } from "./contexts/app";
import App from "./components/06_App/App";

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
