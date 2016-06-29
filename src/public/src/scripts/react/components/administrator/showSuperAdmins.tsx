import * as React from "react";
import {Link, hashHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import store from "../../../stores/companyStore";
import companyActionCreator, {ICompany}
    from "../../../actions/companyActionCreator";
import {ISuperAdmin} from "../../../actions/userActionCreator";
import userStore from "../../../stores/userStore";


/**
 * <p>IShowCompaniesState defines an interface
 * which stores the data of the companies.</p>
 */
export interface IShowAdminsState {

    superAdmins : ISuperAdmin[],
    token : string
}
/**
 * <p>ShowAdmin is a react component that renders
 * the navbar and the table with a list of the Super Admins.</p>
 *
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Davide Polonio | Create class | 29/05/2016 |
 *
 * @author Davide Polonio
 * @license MIT
 */

class ShowAdmins extends React.Component<void, IShowAdminsState> {

    /**
     * @description Default constructor.
     * @return {ShowAdmins}
     */
    constructor() {
        super();
        this.state = {
            superAdmins : userStore.getAllSuperAdmin(),
            token : sessionStore.getAccessToken()
         };
         /*
         * I'll need this in the future
         * this._onChange = this._onChange.bind(this);
         */
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the ShowAdmins component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /*
         * @description Array that will contain the rows of company table
         */
        let showAdminTable:Array<Object> = [];

        this.state.superAdmins.forEach(
            function (superAdmin:ISuperAdmin):void {
                showAdminTable.push(
                    <tr>
                        <td>{superAdmin.email}</td>
                    </tr>
                );
            });

        // Need to fix link to create new super admin
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Super Admins</h3>
                    </div>
                    <div className="divider"></div>
                    <table className="striped">
                        <thead>
                        <tr>
                            <th data-field="name">E-mail</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showAdminTable}
                        </tbody>
                    </table>
                    <div className="right">
                        <Link className="waves-effect waves-light btn" to="/SuperAdmin/Management">
                            Add new super admin
                        </Link>
                    </div>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.SUPERADMIN))) {
            hashHistory.push("/Error403")
        }
    }
}

export default ShowAdmins;