import * as React from "react";
import {Link} from "react-router";
import Navbar from "../../navbar/navbarSuperAdmin";
import companyActionCreator from "../../../actions/companyActionCreator";
import * as ReactDOM from "react-dom";

export default class AddMemberToCompany extends React.Component<void, void> {

    addCompany() : void {
        let email : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["email"]).value;
        let password : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["password"]).value;
        let id : string =
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs["id"]).value;
        let companyName : string =
            ReactDOM.
            findDOMNode<HTMLInputElement>(this.refs["companyName"]).value;
        console.log("AddCompany React");
        console.log(email);
        companyActionCreator.
        addCompany({
                email : email,
                password : password
            },
            {
                name : companyName
            }
        );
    }

    render() : JSX.Element {
        return(
            <div>
                <Navbar></Navbar>
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Add company</h3>
                        <h4 className="grey-text"></h4>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="companyName" type="text"
                                           className="validate"
                                           ref="companyName"/>
                                    <label for="companyName">Name of the company
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="id" type="text"
                                           className="validate"
                                           ref="id"/>
                                    <label for="companyName">Id of the company
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        email
                                    </i>
                                    <input id="email" type="email"
                                           className="validate"  ref="email"/>
                                    <label for="email">Email of the super Owner
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        lock
                                    </i>
                                    <input id="password" type="text"
                                           className="validate"  ref="password"
                                    />
                                    <label for="password">Password of the Owner
                                    </label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn"
                                   onClick={this.addCompany.bind(this)}>
                                    <i className="material-icons left">
                                        done
                                    </i>
                                    Add Company
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
