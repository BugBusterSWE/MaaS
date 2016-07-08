import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import HomePage from "./react/pages/common/home";
import LoginPage from "./react/pages/notlogged/login";
import LogoutPage from "./react/pages/common/logout";
import RecoveryPasswordPage from "./react/pages/notlogged/recoveryPassword";
import CompanyRegistrationPage from
    "./react/pages/notlogged/companyRegistration";

import ProfilePage from "./react/pages/common/profile";
import UpdateProfileEmailPage from "./react/pages/common/updateProfileEmail";
import UpdateProfilePasswordPage from
    "./react/pages/common/updateProfilePassword";


import ShowDatabasesPage from "./react/pages/member/showDatabases";
import ShowDatabasePage from "./react/pages/member/showDatabase";
import AddDatabasePage from "./react/pages/member/addDatabase";
import UpdateDatabasePage from "./react/pages/member/updateDatabase";

import ShowMemberList from "./react/pages/owneradmin/showMemberList";
import EditMemberOfACompany from "./react/pages/owneradmin/editMember";
import AddMemberToCompanyAsAdmin from "./react/pages/owneradmin/addMember";


import Dashboard from "./react/components/dslTables/dashboard";
import Cell from "./react/components/dslTables/cell";
import UpdateCell from "./react/components/dslTables/cellUpdate";
import Document from "./react/components/dslTables/document";
import UpdateDocument from "./react/components/dslTables/documentUpdate";
import Collection from "./react/components/dslTables/collection";
import EditorPage from "./react/pages/common/editor";

import ShowSuperAdminsPage from "./react/pages/sa/showSuperAdmins";
import ShowCompaniesPage from "./react/pages/sa/showCompanies";
import ShowCompanyMembersPage from "./react/pages/sa/showCompanyMembers";
import AddCompanyPage from "./react/pages/sa/addCompany";
import AddMemberPage from "./react/pages/sa/addMemberToCompany";
import AddSuperAdminPage from "./react/pages/sa/addSuperAdmin";
import UpdateCompany from "./react/pages/sa/updateCompany";

import Error404Page from "./react/pages/common/error404";
import Error403Page from "./react/pages/common/error403";



/**
 * @description This method create a route for the front'end MaaS.
 */
ReactDOM.render(
    <Router history={browserHistory}>
        <IndexRoute component={HomePage} />
        <Route path="/" component={HomePage} />
        <Route path="/Home" component={HomePage} />
        <Route path="/Login" component={LoginPage} />
        <Route path="/Logout" component={LogoutPage} />
        <Route path="/RecoveryPassword" component={RecoveryPasswordPage} />
        <Route path="/CompanyRegistration" component={CompanyRegistrationPage}/>

        <Route path="/Profile" component={ProfilePage} />
        <Route path="/Profile/UpdateEmail" component={UpdateProfileEmailPage} />
        <Route path="/Profile/UpdatePassword"
               component={UpdateProfilePasswordPage} />

        <Route path="/Databases" component={ShowDatabasesPage} />
        <Route path="/Databases/Database/:database_id"
               component={ShowDatabasePage} />
        <Route path="/Databases/Add" component={AddDatabasePage} />
        <Route path="/Databases/Update/:database_id"
               component={UpdateDatabasePage} />

        <Route path="/Members"
               component={ShowMemberList} />
        <Route path="/Admin/Edit/:member_id"
               component={EditMemberOfACompany} />
        <Route path="/Admin/AddMember"
               component={AddMemberToCompanyAsAdmin} />

        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Cell" component={Cell} />
        <Route path="/Cell/update" component={UpdateCell} />
        <Route path="/Document" component={Document} />
        <Route path="/Document/update" component={UpdateDocument} />
        <Route path="/Collection" component={Collection} />
        <Route path="/Editor" component={EditorPage} />

        <Route path="/Members:company_id" component={ShowCompanyMembersPage} />
        <Route path="/SuperAdmin/Company/:company_id"
               component={ShowCompanyMembersPage} />
        <Route path="/SuperAdmin/ShowCompanies" component={ShowCompaniesPage} />
        <Route path="/SuperAdmin/ShowSuperAdmins"
               component={ShowSuperAdminsPage} />
        <Route path="/SuperAdmin/AddCompany" component={AddCompanyPage} />
        <Route path="/SuperAdmin/AddSuperAdmin"
               component={AddSuperAdminPage} />
        <Route path="/SuperAdmin/Company/:company_id/AddMember"
               component={AddMemberPage} />
        <Route path="/SuperAdmin/UpdateCompany/:company_id"
               component={UpdateCompany}/>

        <Route path="/Error404" component={Error404Page} />
        <Route path="/Error403" component={Error403Page} />
        <Route path="*" component={Error404Page} />
    </Router>, document.getElementById("content")
);
