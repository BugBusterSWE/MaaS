import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route} from "react-router";

import homePage from "./react/components/home";
import LoginPage from "./react/components/login";
import RecoveryPasswordPage from "./react/components/recoveryPassword";
import ShowCompaniesPage from "./react/components/administrator/showCompanies";
import ShowCompanyMembersPage from "./react/components/administrator/showCompanyMembers";
import AddCompanyPage from "./react/components/administrator/addCompany";
import InviteSuperAdminPage from "./react/components/administrator/inviteSuperAdmin";

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
        <Route path="/SuperAdmin/AddCompany" component={AddCompanyPage}>
        </Route>
        <Route path="/SuperAdmin/InviteSuperAdmin" component={InviteSuperAdminPage}>
        </Route>
    </Router>, document.getElementById("content")
);
