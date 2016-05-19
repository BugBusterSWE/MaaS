/// <reference path="../../typings/react/react-global.d.ts">
/// <reference path="../../typings/react-router/react-router.d.ts" />
/// <reference path="../../typings/history/history.d.ts" />
/// <reference path="./react/app" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";
import * as createHistory from "history";
import App from "./react/app.tsx";
import LoginPage from "./react/components/login.tsx"
import DashboardPage from "./react/components/dashboard.tsx"

let Route : ReactRouter.Route = ReactRouter.Route;
let Router : ReactRouter.Route = ReactRouter.Router;

ReactDOM.render(
    <Router history={createHistory.createHistory()}>
        <Route path="/" component={App}>
            <Route path="/login" component={LoginPage}>
            </Route>
            <Route path="/dashboard" component={DashboardPage}>
            </Route>
        </Route>
    </Router>, document.getElementById("main")
);
