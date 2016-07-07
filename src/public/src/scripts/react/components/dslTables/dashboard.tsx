import * as React from "react";
import {Link, browserHistory} from "react-router";
import Navbar from "../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore"
import store from "../../../stores/dslStore/dashboardStore";
import dashboardActionCreator
    from "../../../actions/dslActionCreator/dashboardActionCreator";
import {IDashboard, IDashboardRow} from "../../../utils/dslDefinitions"

// TODO: Remove console.log
/**
 * <p>IDashboardState defines an interface
 * which stores the dashboard.</p>
 */
export interface IDashboardState {
    dashboard : IDashboard
}

/**
 * <p>Dashboard is a react component that
 * renders the dashboard component.
 * </p>
 *
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Emanuele Carraro |  create class       | 25/06/2015 |
 *
 * @author Emanuele Carraro
 * @license MIT
 */
class Dashboard extends React.Component<void, IDashboardState> {

    /**
     * @description Default constructor.
     * @return {Dashboard}
     */
    constructor() {
        super();
        this.state = {
            dashboard : store.getDashboard()
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the Dashboard component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /*
         * @description Array that will contain the rows of the dashboard
         */
        let dashboardTable : Array<Object> = [];

        this.state.dashboard.rows.forEach(function
            (row : IDashboardRow) : void {
            /* There is a temporary link to a cell/document/collection
             custom page for all elements
             TO BE FIXED/COMPLETE
             */
            if (row.type == "cell") {
                dashboardTable.push(<tr>
                    <td>{row.type}</td>
                    <td>
                        <Link to={`/Cell`}>
                            {row.id}
                        </Link>
                    </td>
                </tr>);
            } else if (row.type == "document") {
                dashboardTable.push(<tr>
                    <td>{row.type}</td>
                    <td>
                        <Link to={`/Document`}>
                            {row.id}
                        </Link>
                    </td>
                </tr>);
            } else if (row.type == "collection") {
                dashboardTable.push(<tr>
                    <td>{row.type}</td>
                    <td>
                        <Link to={`/Collection`}>
                            {row.id}
                        </Link>
                    </td>
                </tr>);
            }
        });


        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Dashboard</h3>
                    </div>
                    <div className="divider"></div>
                    <table className="striped">
                        <thead className="teal light-blue">
                        <tr>
                            <th>Element type</th>
                            <th>Element id</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dashboardTable}
                        </tbody>
                    </table>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */

    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        console.log("dashboard did mount");
        if (!(sessionStore.checkPermission(PermissionLevel.MEMBER))) {
            browserHistory.push("/Error403")
        }
        store.addChangeListener(this._onChange);
        dashboardActionCreator.getDashboardData();
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("dashboard did UNmount");
        store.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange dashboard");
        this.setState({
            dashboard: store.getDashboard()
        });
    }

}

export default Dashboard;
