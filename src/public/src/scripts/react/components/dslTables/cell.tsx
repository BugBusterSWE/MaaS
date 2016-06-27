import {ICell} from "../../../utils/dslDefinitions";
import * as React from "react";
import {Link, browserHistory} from "react-router";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import Navbar from "../../navbar/navbar";

export interface ICellState {
    cell : ICell
}

let cell : ICell = {
    id : "C1",
    label : "myCell",
    type : "string",
    value : "The Cell"
};

class Cell extends React.Component<void, ICellState> {

    /**
     * @description Default constructor.
     * @return {Cell}
     */
    constructor() {
        super();
        this.state = {
            cell : cell
        };
        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the Cell component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Cell</h3>
                    </div>
                    <div id="titles">
                        <h5>Label</h5>
                        <td>{this.state.cell.label}</td>
                        <h5>Type</h5>
                        <td>{this.state.cell.type}</td>
                    </div>
                    <div className="divider"></div>
                    <table className="striped">
                        <thead>
                        <tr>
                            <th data-field="owner">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.cell.value}</td>
                            </tr>
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
        console.log("cell component did mount");
        if (!(sessionStore.checkPermission(PermissionLevel.MEMBER))) {
            browserHistory.push("/Error403")
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        console.log("cell component did UNmount");
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange cell");
    }

}

export default Cell;
