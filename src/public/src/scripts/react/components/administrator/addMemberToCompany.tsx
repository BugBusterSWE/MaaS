import * as React from "react";
import {Link} from "react-router";
import * as ReactDOM from "react-dom";
import Navbar from "../../navbar/navbar";
import {PermissionLevel} from "../../../stores/sessionStore"
import ErrorMessage from "../errorMessageComponent";
import CompanyStore from "../../../stores/companyStore";
import companyActionCreator from "../../../actions/companyActionCreator";
import {ICompany} from "../../../actions/companyActionCreator";


export interface IAddMemberState {
    company : ICompany;
}

export interface IParam {
    company_id : string;
}

export interface IAddMemberProps {
    params : IParam
}

class AddMemberToCompany extends
    React.Component<IAddMemberProps, IAddMemberState> {

    constructor(props : IAddMemberProps) {
        super(props);

        this.state = {
            company: CompanyStore.getCompany(this.props.params.company_id)
        }
    }

    addMember() : void {
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        let password : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
        let level : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["level"]).value;
        let company : string = this.state.company._id;
        // TODO : mettere il token
        companyActionCreator
            .addMember(company, "",  {
            email : email,
            password : password,
            level : level,
            company : company
            });
    }

    // TODO: passare parametro al messaggio di errore
    render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.SUPERADMIN} />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Add member to company</h3>
                        <h4 className="grey-text">{this.state.company.name}</h4>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <ErrorMessage error="Prova" />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="email" className="validate" ref="email"/>
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="text" className="validate" ref="password"/>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <select className="browser-default" ref="level">
                                        <option value="MEMBER" selected="true">
                                            Member
                                        </option><option value="ADMIN">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.addMember.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Add
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }
}

/**
 * @description The AddMemberToCompany type exported by default.
 */
export default AddMemberToCompany;
