import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import HomePage from "./react/pages/common/home";
import LoginPage from "./react/pages/notlogged/login";
import RecoveryPasswordPage from "./react/pages/notlogged/recoveryPassword";
import LogoutPage from "./react/pages/common/logout";
import Error404Page from "./react/pages/common/error404";
import Error403Page from "./react/pages/common/error403";
import CompanyRegistrationPage from
    "./react/pages/notlogged/companyRegistration";
import ProfilePage from "./react/pages/common/profile";
import UpdateProfileEmailPage from "./react/pages/common/updateProfileEmail";
import UpdateProfilePasswordPage from
    "./react/pages/common/updateProfilePassword";
import ShowSuperAdminsPage from "./react/pages/sa/showSuperAdmins";
import ShowMemberList from "./react/pages/owneradmin/showMemberList";
import EditMemberOfACompany from "./react/pages/owneradmin/editMember";

// Import Dashboard
// Import Collection
// Import Editor
// Import Members
import ShowCompaniesPage from "./react/pages/sa/showCompanies";
import ShowCompanyMembersPage from "./react/pages/sa/showCompanyMembers";
import AddCompanyPage from "./react/pages/sa/addCompany";
import AddMemberPage from "./react/pages/sa/addMemberToCompany";
import AddSuperAdminPage from "./react/pages/sa/addSuperAdmin";
import UpdateCompany from "./react/pages/sa/updateCompany";


/**
 * @description This method create a route for the front'end MaaS.
 */
ReactDOM.render(
    <Router history={browserHistory}>
        <IndexRoute component={HomePage} />
        <Route path="/" component={HomePage} />
        <Route path="/Home" component={HomePage} />
        <Route path="/Login" component={LoginPage} />
        <Route path="/CompanyRegistration" component={CompanyRegistrationPage}/>
        <Route path="/RecoveryPassword" component={RecoveryPasswordPage} />
        <Route path="/Logout" component={LogoutPage} />
        <Route path="/Dashboard" component={HomePage} />
        <Route path="/Collection" component={HomePage} />
        <Route path="/Editor" component={HomePage} />
        <Route path="/Members:company_id" component={ShowCompanyMembersPage} />

        <Route path="/Profile" component={ProfilePage} />
        <Route path="/Profile/UpdateEmail" component={UpdateProfileEmailPage} />
        <Route path="/Profile/UpdatePassword"
               component={UpdateProfilePasswordPage} />

        <Route path="/SuperAdmin/company/:company_id/addMember"
               component={AddMemberPage} />
        <Route path="/SuperAdmin/updateCompany/:company_id"
               component={UpdateCompany}/>
        <Route path="/SuperAdmin/ShowCompanies" component={ShowCompaniesPage} />
        <Route path="/SuperAdmin/company/:company_id"
               component={ShowCompanyMembersPage} />
        <Route path="/SuperAdmin/AddCompany" component={AddCompanyPage} />
        <Route path="/SuperAdmin/AddSuperAdmin"
            component={AddSuperAdminPage} />
        <Route path="/SuperAdmin/ShowSuperAdmins"
            component={ShowSuperAdminsPage} />

        <Route path="/Members"
             component={ShowMemberList} />
        <Route path="/Admin/Edit/:member_id"
             component={ShowMemberList} />

            <Route path="/Error404" component={Error404Page} />
        <Route path="/Error403" component={Error403Page} />
        <Route path="*" component={Error404Page} />
    </Router>, document.getElementById("content")
);
