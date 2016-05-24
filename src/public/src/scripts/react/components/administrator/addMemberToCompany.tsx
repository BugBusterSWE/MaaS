/// <reference path="../../../../../typings/react/react.d.ts" />

import * as React from "react";
import * as ReactRouter from "react-router";
import * as ReactDOM from "react-dom";

import CompanyStore from "../../../stores/companyStore.ts";
//import Actions from "../../actionCreators/collectionActionCreator.ts"
import Navbar from "../../navbar/navbarSuperAdmin.tsx";
import {companyActionCreator} from "../../../actionCreators/companyActionCreator.ts";

let Link : ReactRouter.Link = ReactRouter.Link;

export default class AddMemberToCompany extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            company: CompanyStore.getCompany(this.props.params.company_id),
        }
    }

    addMember() {
        let email = ReactDOM.findDOMNode(this.refs.email).value;
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        let level = ReactDOM.findDOMNode(this.refs.level).value;
        let company = this.state.company._id;

        companyActionCreator.addMember(company, {email, password, level, company});

    }

    render() {
        return(
            <div>
                <Navbar></Navbar>
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Add member to company</h3>
                        <h4 className="grey-text">{this.state.company.name}</h4>
                    </div>
                    <div className="divider"></div>

                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        email
                                    </i>
                                    <input id="email" type="email" className="validate" ref="email"/>
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">
                                        lock
                                    </i>
                                    <input id="password" type="text" className="validate" ref="password"/>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <select className="browser-default" ref="level">
                                        <option value="MEMBER" selected>
                                            Member
                                        </option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.addMember.bind(this)}>
                                    <i className="material-icons left">
                                        done
                                    </i>
                                    Add
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
