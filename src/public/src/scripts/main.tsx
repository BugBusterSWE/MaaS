import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route} from "react-router";

import homePage from "./react/components/home";
import LoginPage from "./react/components/login";
import RecoveryPasswordPage from "./react/components/recoveryPassword";
import LogoutPage from "./react/components/logout";
// Import Dashboard
// Import Collection
// Import Editor
// Import Members
import ShowCompaniesPage from "./react/components/administrator/showCompanies";
import ShowCompanyMembersPage
    from "./react/components/administrator/showCompanyMembers";
import AddCompanyPage from "./react/components/administrator/addCompany";
import InviteSuperAdminPage
    from "./react/components/administrator/inviteSuperAdmin";

import { hashHistory } from "react-router";


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={homePage} />
        <Route path="/Home" component={homePage} />
        <Route path="/Login" component={LoginPage} />
        <Route path="/RecoveryPassword" component={RecoveryPasswordPage} />
        <Route path="/Logout" component={LogoutPage} />
        <Route path="/Dashboard" component={homePage} />
        <Route path="/Collection" component={homePage} />
        <Route path="/Editor" component={homePage} />
        <Route path="/Members:company_id" component={ShowCompanyMembersPage} />
        <Route path="/SuperAdmin/ShowCompanies" component={ShowCompaniesPage} />
        <Route path="/SuperAdmin/company/:company_id"
               component={ShowCompanyMembersPage} />
        <Route path="/SuperAdmin/AddCompany" component={AddCompanyPage} />
        <Route path="/SuperAdmin/InviteSuperAdmin"
               component={InviteSuperAdminPage} />
    </Router>, document.getElementById("content")
);
