import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route} from "react-router";

import HomePage from "./react/components/home";
import LoginPage from "./react/components/login";
import RecoveryPasswordPage from "./react/components/recoveryPassword";
import LogoutPage from "./react/components/logout";
import Error404Page from "./react/components/error404";
// Import Dashboard
// Import Collection
// Import Editor
// Import Members
// Import Logout
// Import 404 <DefaultRoute handler={homePage}/>
import ShowCompaniesPage from "./react/components/administrator/showCompanies";
import ShowCompanyMembersPage
    from "./react/components/administrator/showCompanyMembers";
import AddCompanyPage from "./react/components/administrator/addCompany";
import InviteSuperAdminPage
    from "./react/components/administrator/inviteSuperAdmin";

import { hashHistory } from "react-router";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/Error404" component={Error404Page} />

        <Route path="/" component={HomePage} />
        <Route path="/Home" component={HomePage} />
        <Route path="/Login" component={LoginPage} />
        <Route path="/RecoveryPassword" component={RecoveryPasswordPage} />
        <Route path="/Logout" component={LogoutPage} />

        <Route path="/Dashboard" component={HomePage} />
        <Route path="/Collection" component={HomePage} />
        <Route path="/Editor" component={HomePage} />
        <Route path="/Members:company_id" component={ShowCompanyMembersPage} />


        <Route path="/SuperAdmin/ShowCompanies" component={ShowCompaniesPage} />
        <Route path="/SuperAdmin/company/:company_id"
               component={ShowCompanyMembersPage} />
        <Route path="/SuperAdmin/AddCompany" component={AddCompanyPage} />
        <Route path="/SuperAdmin/InviteSuperAdmin"
            component={InviteSuperAdminPage} />
        <Route path="*" component={Error404Page} />

    </Router>, document.getElementById("content")
);
