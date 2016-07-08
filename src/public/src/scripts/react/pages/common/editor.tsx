import * as React from "react";
import {Link, browserHistory} from "react-router";
import * as ReactDOM from "react-dom";
import * as ReactCodemirror from "react-codemirror";
import Navbar from "../../components/navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import ErrorMessage from "../../components/errorMessageComponent";
import {EmptyChecker} from "../../../utils/checker";

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
            code: "Write your DSL here."
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
            mode: "markdown"
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
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12" >
                            <ReactCodemirror value={this.state.code} onChange={this._update.bind(this)} options={options}  />
                            <div className="input-field col s12">
                                <input id="name" type="text" className="validate" ref="name"/>
                                <label for="name">Name</label>
                            </div>
                        </form>
                        <div className="right">
                            <a className="waves-effect waves-light btn" onClick={this._saveCode.bind(this)}>
                                Save
                            </a>
                        </div>
                    </div>
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
        // TODO: to implement
    }

    /**
     * @description
     * <p>This method take the input value of the user and create
     * the action to update the data</p>
     * @constructor
     */
    private _saveCode(newCode : string) : void {
        let nameValue : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["name"]).value;
        let emptyChecker : EmptyChecker = new EmptyChecker(nameValue);
        if (!emptyChecker.check()) {
            this.setState({
                code: this.state.code,
                message: "Empty name field"
            });
        } else {
            browserHistory.push("/Home");
        }
    }

    /**
     * @description
     * <p>This method take the input value of the user and create
     * the action to update the data</p>
     * @constructor
     */
    private _update(newCode : string) : void {
        this.setState({
            code: newCode,
            message: this.state.message
        });
    }
}

export default Editor;
