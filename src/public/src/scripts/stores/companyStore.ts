import {
    IMember, ICompany,
    IAddCompanyResponse, DispatcherAddMember,
    IAddMemberResponse
} from "../actions/companyActionCreator";
import {DispatcherCompaniesData,
    DispatcherCompaniesMembers,
    DispatcherAddCompany} from "../actions/companyActionCreator";
import {EventEmitter} from "events";
import {Action, ActionError} from "../dispatcher/dispatcher";

// TODO: Remove console.log function
/**
 * CompanyStore contains all the logic of all the Companies Entities.
 *
 *
 * @history
 * | Author           | Action Performed          | Data       |
 * | ---              | ---                       | ---        |
 * | Emanuele Carraro | Create class CompanyStore | 27/05/2016 |
 *
 *
 * @author Emanuele Carraro
 * @copyright MIT
 */
class CompanyStore extends EventEmitter {

    /**
     * @description string for events management.
     */
    private static CHANGE_EVENT : string = "change";

    /**
     * @description Contains the data of all companies.
     */
    private companiesData : ICompany[] = [];

    /**
     * @description <p>Represent the members of a company.
     * This array changes over time (for each query).
     * 
     */
    private companyMembers : IMember[] = [];

    /**
     * @description This data field represents the addCompany response.
     * @type {IAddCompanyResponse}
     * @private
     */
    private _addCompanyResponse : IAddCompanyResponse = {
        user : undefined,
        company : undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs
     *  during an add Company action. </p>
     * @type {ActionError}
     * @private
     */
    private _addCompanyActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs
     *  during an Add Member action. </p>
     * @type {ActionError}
     * @private
     */
    private _addMemberActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a CompanyStore and registers it to multiple
     * dispatchers. </p>
     * @return {CompanyStore}
     */
    constructor() {
        super();
        this.actionRegister(this);
    }

    /**
     * @description Update the companies array.
     * @param data {ICompany[]} The data of the companies to update.
     * @returns {void}
     */
    public updateData(data : ICompany[]) : void {
        console.log("update comapany Data");
        this.companiesData = data;
    }

    /**
     * @description Update the members array.
     * @param data {IMember[]} The members to update.
     * @returns {void}
     */
    public updateMembers(data : IMember[]) : void {
        this.companyMembers = data;
    }

    /**
     * @description Get the data of the companies.
     * @returns {ICompany[]}
     */
    public getCompaniesData() : ICompany[] {
        return this.companiesData;
    }

    /**
     * @description Return the company which id equals _id.
     * @param _id {ICompany} 
     * @returns {ICompany}
     */
    public getCompany(_id : string) : ICompany {
        let check : boolean = false;
        let company : ICompany = {
            name: "Not defined",
            owner : "Not defined",
            _id: "Null"
        };
        for (let i : number = 0; i < this.companiesData.length && !check; ++i) {
            if (this.companiesData[i]._id === _id) {
                company.name = this.companiesData[i].name;
                company.owner = this.companiesData[i].owner;
                company._id = this.companiesData[i]._id;
                check = true;
            }
        }
        return company;
    }

    /**
     * @description Get the members of a specific company.
     * @param company_id {string} id of the specific company.
     * @returns {IMember[]}
     */
    public getCompanyMembers(company_id : string) : IMember[] {
        return this.companyMembers;
    }

    /**
     * @description attach a React component as a listener to this store
     * @param callback 
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback</p>
     * @returns {void}
     */
    public addChangeListener(callback : () => void) : void {
        this.on(CompanyStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback 
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback.</p>
     * @returns {void}
     */
    public removeChangeListener(callback : () => void) : void {
        this.removeListener(CompanyStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Return the action error.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the addCompany action is done successfully.</p>
     */
    public getAddCompanyError() : string  {
        return this._addCompanyActionError.message;
    }

    /**
     * @description Check if the addCompany response is not correct.
     * @returns {boolean}
     */
    public addCompanyError() : boolean {
        if (this._addCompanyActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the action error.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the addMember action is done successfully.</p>
     */
    public getAddMemberError() : string  {
        return this._addMemberActionError.message;
    }

    /**
     * @description Check if the addMember response is not correct.
     * @returns {boolean}
     */
    public addMemberError() : boolean {
        if (this._addMemberActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Registers the companyStore to multiple dispatchers.
     * @param store {SessionStore}
     * @returns {void}
     */
    private actionRegister(store : CompanyStore) : void {

        console.log("Action register comapany Data");
        DispatcherCompaniesData.register(
            function (action : Action<ICompany[]>) : void {
                store.updateData(action.actionData);
                store.emitChange();
            }
        );

        DispatcherCompaniesMembers.register(
            function (action : Action<IMember[]>) : void {
                store.updateMembers(action.actionData);
                store.emitChange();
            }
        );

        DispatcherAddCompany.register(
            function (action : Action<IAddCompanyResponse>) : void {
                if (action.actionData) {
                    store._addCompanyResponse = action.actionData;
                    store._addCompanyActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._addCompanyActionError = action.actionError;
                    store._addCompanyResponse = {
                        user : undefined,
                        company : undefined
                    };
                }
                store.emitChange();
            }
        );

        DispatcherAddMember.register(
            function (action : Action<IAddMemberResponse>) : void {
                console.log("Dispatching Add Member action");
                if (action.actionData) {
                    console.log("Dispatcher Add Member actionData");
                    store._addMemberActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    console.log("Dispatcher AddMember Error");
                    store._addMemberActionError = action.actionError;
                }
                store.emitChange();
            }
        );
    }

    /**
     * @description Emit changes to React components.
     * @returns {void}
     */
    private emitChange() : void {
        this.emit(CompanyStore.CHANGE_EVENT);
    }

}

let store : CompanyStore = new CompanyStore();
export default store;

