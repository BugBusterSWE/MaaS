import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import HomePage from "./react/components/home";
import LoginPage from "./react/components/login";
import RecoveryPasswordPage from "./react/components/recoveryPassword";
import LogoutPage from "./react/components/logout";
import Error404Page from "./react/components/error404";
import Error403Page from "./react/components/error403";
import Dashboard from "./react/components/dslTables/dashboard";
import Cell from "./react/components/dslTables/cell";
import Document from "./react/components/dslTables/document";
// Import Collection
// Import Editor
// Import Members
import ShowCompaniesPage from "./react/components/administrator/showCompanies";
import ShowCompanyMembersPage
    from "./react/components/administrator/showCompanyMembers";
import AddCompanyPage from "./react/components/administrator/addCompany";
import AddMemberPage from "./react/components/administrator/addMemberToCompany";
import InviteSuperAdminPage
    from "./react/components/administrator/inviteSuperAdmin";
import UpdateCompany from "./react/components/administrator/updateCompany";


/**
 * @description This method create a route for the front'end MaaS.
 */
ReactDOM.render(
    <Router history={browserHistory}>
        <IndexRoute component={HomePage} />
        <Route path="/Error404" component={Error404Page} />
        <Route path="/Error403" component={Error403Page} />
        <Route path="/" component={HomePage} />
        <Route path="/Home" component={HomePage} />
        <Route path="/Login" component={LoginPage} />
        <Route path="/RecoveryPassword" component={RecoveryPasswordPage} />
        <Route path="/Logout" component={LogoutPage} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Cell" component={Cell} />
        <Route path="/Document" component={Document} />
        <Route path="/Collection" component={HomePage} />
        <Route path="/Editor" component={HomePage} />
        <Route path="/Members:company_id" component={ShowCompanyMembersPage} />
        <Route path="/SuperAdmin/company/:company_id/addMember"
               component={AddMemberPage} />
        <Route path="/SuperAdmin/updateCompany/:company_id"
               component={UpdateCompany}/>
        <Route path="/SuperAdmin/ShowCompanies" component={ShowCompaniesPage} />
        <Route path="/SuperAdmin/company/:company_id"
               component={ShowCompanyMembersPage} />
        <Route path="/SuperAdmin/AddCompany" component={AddCompanyPage} />
        <Route path="/SuperAdmin/InviteSuperAdmin"
            component={InviteSuperAdminPage} />
        <Route path="*" component={Error404Page} />
    </Router>, document.getElementById("content")
);
