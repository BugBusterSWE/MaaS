import {EventEmitter} from "events";
import {Action, ActionError} from "../dispatcher/dispatcher";
import {DispatcherCompaniesData,
    DispatcherAddMember, IMember, IAddMemberResponse,
    DispatcherAddCompany, ICompany, IAddCompanyResponse,
    DispatcherUpdateCompany,
    DispatcherCompaniesMembers,
    DispatcherFindCompany, IFindCompany,
    DispatcherRemoveCompany, IRemoveCompany, IRemoveCompanyResponse
} from "../actions/companyActionCreator";


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
    private _companiesData : ICompany[] = [];

    /**
     * @description <p>Represent the members of a company.
     * This array changes over time (for each query).
     */
    private _companyMembers : IMember[] = [];

    /**
     * @description <p>Represent the find company response.</p>
     */
    private _findCompanyResponse : ICompany = {
        name : undefined,
        owner : undefined,
        _id : undefined,
    };

    /**
     * @description <p>Represent the remove company response.</p>
     */
    private _removeCompanyResponse : IRemoveCompanyResponse = {
        message: undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs
     *  during an add Company action. </p>
     * @type {ActionError}
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
     */
    private _addMemberActionError : ActionError = {
        code : undefined,
        message : undefined
    };

    /**
     * @description
     * <p>This data field represents an error occurs
     *  during an Update Member action. </p>
     * @type {ActionError}
     */
    private _updateCompanyActionError : ActionError = {
        code : undefined,
        message : undefined
    }


    /**
     * @description
     * <p>This data field represents an error occurs
     *  during find company action. </p>
     * @type {ActionError}
     */
    private _findCompanyActionError : ActionError = {
        code : undefined,
        message : undefined
    }

    /**
     * @description
     * <p>This data field represents an error occurs
     *  during remove company action. </p>
     * @type {ActionError}
     */
    private _removeCompanyActionError : ActionError = {
        code : undefined,
        message : undefined
    }


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
        this._companiesData = data;
    }

    /**
     * @description Update the members array.
     * @param data {IMember[]} The members to update.
     * @returns {void}
     */
    public updateMembers(data : IMember[]) : void {
        this._companyMembers = data;
    }

    /**
     * @description Get the data of the companies.
     * @returns {ICompany[]}
     */
    public getCompaniesData() : ICompany[] {
        return this._companiesData;
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
        for (let i : number = 0;
             i < this._companiesData.length && !check;
             ++i) {
            console.log("Checking if " + this._companiesData[i] +
            " equals " + _id);
            if (this._companiesData[i]._id === _id) {
                company.name = this._companiesData[i].name;
                company.owner = this._companiesData[i].owner;
                company._id = this._companiesData[i]._id;

                console.log("True");
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
        return this._companyMembers;
    }

    /**
     * @description Get the company searched with find company action.
     * @returns {ICompany}
     */
    public getFindCompanyResponse() : ICompany {
        return this._findCompanyResponse;
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
     * @description Return the action error.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the updateCompany action is done successfully.</p>
     */
    public getUpdateCompanyError() : string  {
        return this._updateCompanyActionError.message;
    }

    /**
     * @description Check if the updateCompany response is not correct.
     * @returns {boolean}
     */
    public updateCompanyError() : boolean {
        if (this._updateCompanyActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Check if the find company response is not correct.
     * @returns {boolean}
     */
    public isFindCompanyError() : boolean {
        if (this._findCompanyActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the action error.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the find company action is done successfully.</p>
     */
    public getFindCompanyError() : string  {
        return this._findCompanyActionError.message;
    }

    /**
     * @description Check if the remove company response is not correct.
     * @returns {boolean}
     */
    public isRemoveCompanyErrored() : boolean {
        if (this._removeCompanyActionError.code) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Return the action error.
     * @returns {string}
     * <p>The action error. It may return undefined if
     * the removeCompany action is done successfully.</p>
     */
    public getRemoveCompanyErrorMessage() : string  {
        return this._removeCompanyActionError.message;
    }

    /**
     * @description Registers the companyStore to multiple dispatchers.
     * @param store {CompanyStore}
     * @returns {void}
     */
    private actionRegister(store : CompanyStore) : void {

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
                    store._addCompanyActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._addCompanyActionError = action.actionError;
                }
                store.emitChange();
            }
        );

        DispatcherAddMember.register(
            function (action : Action<IAddMemberResponse>) : void {
                if (action.actionData) {
                    store._addMemberActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._addMemberActionError = action.actionError;
                }
                store.emitChange();
            }
        );

        DispatcherUpdateCompany.register(
            function (action : Action<Object>) : void {
                if (action.actionData) {
                    store._updateCompanyActionError = {
                        code : undefined,
                        message : undefined
                    };
                } else {
                    store._updateCompanyActionError = action.actionError;
                }
                store.emitChange();
            }
        )

        DispatcherFindCompany.register(
            function (action : Action<ICompany>) : void {
                if (action.actionData) {
                    store._findCompanyResponse = action.actionData;
                    store._findCompanyActionError = {
                        code : undefined,
                        message : undefined
                    }
                } else {
                    store._findCompanyActionError = action.actionError;
                    store._findCompanyResponse = {
                        name : undefined,
                        owner : undefined,
                        _id : undefined
                    };
                }
                store.emitChange();
            }
        )

        DispatcherRemoveCompany.register(
            function (action : Action<IRemoveCompanyResponse>) : void {
                if (action.actionData) {
                    store._removeCompanyResponse = action.actionData;
                    store._removeCompanyActionError = {
                        code : undefined,
                        message : undefined
                    };
                } else {
                    store._removeCompanyActionError = action.actionError;
                    store._removeCompanyResponse = {
                        message: undefined
                    };
                }
                store.emitChange();
            }
        )

    }

    /**
     * @description Emit changes to React pages.
     * @returns {void}
     */
    private emitChange() : void {
        this.emit(CompanyStore.CHANGE_EVENT);
    }

}

let companyStore : CompanyStore = new CompanyStore();
export default companyStore;

