import {IDashboard} from "../../../utils/dslDefinitions";
import * as React from "react";
import {Link, browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../../navbar/navbar";

export interface IDashboardState {
    dashboard : IDashboard
}

export interface IDashboardRow {
    type : "collection" | "document" | "cell",
    id : string;
}

let dashboard : IDashboard = {
    rows : [
        {
            type : "cell",
            id : "c1"
        }
    ]
};

class Dashboard extends React.Component<void, IDashboardState> {

    /**
     * @description Default constructor.
     * @return {Dashboard}
     */
    constructor() {
        super();
        this.state = {
            dashboard: dashboard
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
            dashboardTable.push(<tr>
                <td>{row.type}</td>
                <td>{row.id}</td>
            </tr>);
        });


        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Dashboard</h3>
                        <h4 className="grey-text"></h4>
                    </div>
                    <div className="divider"></div>
                    <table className="striped">
                        <thead>
                        <tr>
                            <th data-field="name">Element type</th>
                            <th data-field="owner">Element id</th>
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
        console.log("dashboard component did mount");
        if (!(sessionStore.checkPermission(PermissionLevel.MEMBER))) {
            browserHistory.push("/Error403")
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("dashboard component did UNmount");
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange showCompanies");
    }

}

export default Dashboard;
