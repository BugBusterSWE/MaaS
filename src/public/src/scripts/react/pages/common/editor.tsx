import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import * as ReactCodemirror from "react-codemirror";
import * as Codemirror from "codemirror";
import Navbar from "../../components/navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import ErrorMessage from "../../components/errorMessageComponent";


/**
 * This interface represents the state of the Edit page.
 */
export interface IEditorState {
    message : string;
    code : string;
}

/**
 * This class represents the user editor page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/06/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class Editor extends React.Component<void, IEditorState> {

    /**
     * @description
     * <p>This constructor calls his super constructor.</p>
     * @return {UpdateProfileEmail}
     */
    constructor() {
        super();
        this.state = {
            message: "",
            code: "Hello world !!!"
        };
    }

    /**
     * @description
     * <p>This method do the render of this class {Editor}.</p>
     * @returns {JSX.Element}
     */
    render() : JSX.Element {
        let options : Object = {
            lineNumbers: true,
            readOnly: false,
            mode: "javascript"
        };
        /* tslint:disable: max-line-length */
        return (
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Editor</h3>
                    </div>
                    <div className="divider"></div>
                    <form>
                        <ReactCodemirror value={this.state.code} onChange={this._updateCode.bind(this)} options={options}  />
                    </form>
                </div>
            </div>
        )
        /* tslint:enable: max-line-length */
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.GUEST))) {
            browserHistory.push("/Error403");
        }
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        // TODO: necessary?
    }

    /**
     * @description
     * <p>This method take the input value of the user and create
     * the action to update the data</p>
     * @constructor
     */
    private _updateCode(newCode : string) : void {
        this.setState({
            message: this.state.message,
            code: newCode
        });
    }
}

export default Editor;
