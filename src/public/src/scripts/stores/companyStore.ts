import {IMember, ICompany, IAddCompany} from "../actions/companyActionCreator";
import {DispatcherCompaniesData,
    DispatcherCompaniesMembers,
    DispatcherAddCompany} from "../actions/companyActionCreator";
import {EventEmitter} from "events";
import {Action} from "../dispatcher/dispatcher";


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
    // TODO: da sistemare
    public getCompanyMembers(company_id : string) : IMember[] {
        // Questo ciclo for e' utile? Non se ricevo i dati giusti
        // Al caricamento di showCompaniesMembers
        /*
        let members = [];
        console.log(this.companiesMembers);
        for(let i = 0; i< this.companiesMembers.length; ++i ) {
            if(this.companiesMembers[i].company == company_id) {
                members.push(this.companiesMembers[i]);
            }
        }
        */
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
            function (action : Action<IAddCompany>) : void {
                store.emitChange();
            }
        )
    }

    /**
     * @description Emit changes to React components.
     * @returns {void}
     */
    private emitChange() : void {
        this.emit(CompanyStore.CHANGE_EVENT);
    }

}

/**
 * @description The CompanyStore object to export as a singleton.
 */
let store : CompanyStore = new CompanyStore();
export default store;

