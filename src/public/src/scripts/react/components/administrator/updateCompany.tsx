import * as React from "react";
import * as ReactDOM from "react-dom";
import {browserHistory} from "react-router";
import Navbar from "../../navbar/navbar";
import sessionStore, {PermissionLevel} from "../../../stores/sessionStore";
import companyStore from "../../../stores/companyStore";
import {EmptyChecker} from "../../../utils/checker";
import ErrorMessage from "../errorMessageComponent";
import companyActionCreator, {ICompany}
    from "../../../actions/companyActionCreator";

/**
 * <p>IUpdateCompanyState defines an interface
 * to store the token of the user</p>
 */
export interface IUpdateCompanyState {
    token : string;
    company : ICompany;
    message : string;
}

/**
 * <p>IUpdateCompanyProps defines an interface
 * which stores the params (the company_id passed through the URI)</p>
 */
export interface IUpdateCompanyProps {
    params : ReactRouter.Params
}

/**
 * <p>UpdateCompany is a react component that renders
 * the update company component.
 * </p>
 *
 * @history
 * | Author           | Action Performed    | Data       |
 * |------------------|---------------------|------------|
 * | Emanuele Carraro |  create class       | 2/06/2015  |
 *
 * @author Emanuele Carraro
 * @license MIT
 */
class UpdateCompany extends React.Component<IUpdateCompanyProps,
                                            IUpdateCompanyState> {

    /**
     * @description ID of the company.
     */
    private company_id : string = this.props.params["company_id"];

    /**
     * @description Default constructor.
     * @return {UpdateCompany}
     */
    constructor(props : IUpdateCompanyProps) {
        super(props);
        this.state = {
            token : sessionStore.getAccessToken(),
            company : companyStore.getCompany(this.company_id),
            message : companyStore.getUpdateCompanyError()
        };

        this._onChange = this._onChange.bind(this);
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the UpdateCompanies component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {

        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar />
                <div id="contentBody" className="container">
                    <div id="titles">
                        <h3>Company</h3>
                        <h4 className="grey-text">{this.state.company.name}</h4>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <ErrorMessage error={this.state.message} />
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="companyName" type="text" className="validate" ref="companyName"/>
                                    <label for="companyName">Name of the company</label>
                                </div>
                            </div>
                            <div className="right">
                                <a className="waves-effect waves-light btn" onClick={this.updateCompany.bind(this)}>
                                    <i className="material-icons left">done</i>
                                    Update Company
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }

    /**
     * @description
     * <p>This method is call when the user click
     * on the update Company button.</p>
     */
    private updateCompany() : void {
        let companyName : string =
            ReactDOM.
            findDOMNode<HTMLInputElement>(this.refs["companyName"]).value;
        console.log("UpdateCompany React");
        let emptyChecker : EmptyChecker = new EmptyChecker(companyName);
        if (emptyChecker.check()) {
            this.setState({
                token : sessionStore.getAccessToken(),
                company : companyStore.getCompany(this.company_id),
                message : "Empty name field"
            });
        } else {
            companyActionCreator.updateCompany(
                {
                    name : companyName,
                },
                this.state.token,
                this.state.company._id
            );
        }
    }

    /**
     * @description This method is called when the component mount.
     */
    private componentDidMount() : void {
        if (!(sessionStore.checkPermission(PermissionLevel.SUPERADMIN))) {
            browserHistory.push("/Error403")
        }
        companyStore.addChangeListener(this._onChange);
        companyActionCreator.getCompaniesData(this.state.token);
    }

    /**
     * @description This method is called when the component will unmount.
     */
    private componentWillUnmount() : void {
        companyStore.removeChangeListener(this._onChange);
    }

    /**
     * @description This method is called every time the store change.
     */
    private _onChange() : void {
        console.log("onChange updateCompany");
        let errorMessage : string = "";
        if (companyStore.updateCompanyError()) {
            errorMessage = companyStore.getUpdateCompanyError()
        }
        this.setState({
            token : sessionStore.getAccessToken(),
            company : companyStore.getCompany(this.company_id),
            message : errorMessage
        });
    }

}

export default UpdateCompany;
