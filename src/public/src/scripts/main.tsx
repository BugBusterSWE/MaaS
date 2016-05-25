import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route} from "react-router";

import homePage from "./react/components/home.tsx";

import { hashHistory } from 'react-router';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={homePage}>
        </Route>
    </Router>, document.getElementById("content")
);
