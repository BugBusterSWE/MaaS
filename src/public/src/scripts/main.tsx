import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";

import ShowCompaniesPage from "./react/components/administrator/showCompanies.tsx";
import InviteSuperAdminPage from "./react/components/administrator/inviteSuperAdmin.tsx";
import ShowCompanyMembersPage from "./react/components/administrator/showCompanyMembers.tsx";
import AddMembertoCompanyPage from "./react/components/administrator/addMemberToCompany.tsx";
import AddCompanyPage from "./react/components/administrator/addCompany.tsx";

import RedirectPage from "./react/redirect.tsx";
import LoginPage from "./react/components/login.tsx";
import RecoveryPasswordPage from "./react/components/recoveryPassword.tsx";
import { hashHistory } from 'react-router';

let Route : ReactRouter.Route = ReactRouter.Route;
let Router : ReactRouter.Route = ReactRouter.Router;

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={RedirectPage}>
        </Route>
        <Route path="/Home" component={RedirectPage}>
        </Route>
         <Route path="/Login" component={LoginPage}>
        </Route>
        <Route path="/RecoveryPassword" component={RecoveryPasswordPage}>
        </Route>
 
        <Route path="/SuperAdmin/ShowCompanies" component={ShowCompaniesPage}>
        </Route>
         <Route path="/SuperAdmin/InviteSuperAdmin" component={InviteSuperAdminPage}>
        </Route>
        <Route path="/SuperAdmin/company/:company_id" component={ShowCompanyMembersPage}>
        </Route>
        <Route path="/SuperAdmin/company/:company_id/addMember" component={AddMembertoCompanyPage}>
        </Route>
        <Route path="/SuperAdmin/AddCompany" component={AddCompanyPage}>
        </Route>
        
    </Router>, document.getElementById("content")
);
