import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route} from "react-router";

import homePage from "./react/components/home.tsx";
import LoginPage from "./react/components/login.tsx";
import RecoveryPasswordPage from "./react/components/recoveryPassword.tsx";
import ShowCompaniesPage from "./react/components/administrator/showCompanies.tsx";
import ShowCompanyMembersPage from "./react/components/administrator/showCompanyMembers.tsx";

import { hashHistory } from 'react-router';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={homePage}>
        </Route>
        <Route path="/Login" component={LoginPage}>
        </Route>
        <Route path="/RecoveryPassword" component={RecoveryPasswordPage}>
        </Route>
        <Route path="/SuperAdmin/ShowCompanies" component={ShowCompaniesPage}>
        </Route>
        <Route path="/SuperAdmin/company/:company_id" component={ShowCompanyMembersPage}>
        </Route>
    </Router>, document.getElementById("content")
);
