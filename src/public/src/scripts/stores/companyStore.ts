import {IMember, ICompany, IAddCompany} from "../actions/companyActionCreator";
import {DispatcherCompaniesData,
    DispatcherCompaniesMembers,
    DispatcherAddCompany} from "../actions/companyActionCreator";
import {EventEmitter} from "events";
import {Action} from "../dispatcher/dispatcher";


/**
 * CompanyStore contains all the logic of all the Companies Entities.
 *
 * This model represent a connection to a company.
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
     * It creates a companyStore and registers it to multiple
     * dispatchers. </p>
     * @return {CompanyStore}
     */
    constructor() {
        super();
        this.actionRegister(this);
    }

    /**
     * @description Registers the companyStore to multiple dispatchers.
     * @param companyStore {CompanyStore}
     * @returns {void}
     */
    actionRegister(companyStore : CompanyStore) : void {

        DispatcherCompaniesData.register(
            function (action : Action<ICompany[]>) : void {
                companyStore.updateData(action.data);
                companyStore.emitChange();
            }
        );
        DispatcherCompaniesMembers.register(
            function (action : Action<IMember[]>) : void {
                companyStore.updateMembers(action.data);
                companyStore.emitChange();
            }
        );
        DispatcherAddCompany.register(
            function (action : Action<IAddCompany>) : void {
                companyStore.addCompany(action.data.company);
                companyStore.addMember(action.data.user);
            }
        )
    }
    
    /**
     * @description Update the companies array.
     * @param data {ICompany[]} The data of the companies to update.
     * @returns {void}
     */
    updateData(data : ICompany[]) : void {
        this.companiesData = data;
    }

    /**
     * @description Update the members array.
     * @param data {IMember[]} The members to update.
     * @returns {void}
     */
    updateMembers(data : IMember[]) : void {
        this.companyMembers = data;
    }

    /**
     * @description Add a new company.
     * @param data {ICompany} The data of the company to add.
     * @returns {void}
     */
    addCompany(data : ICompany) : void {
        this.companiesData.push(data);
    }

    /**
     * @description Add a new member.
     * @param data {IMember} The member to add.
     * @returns {void}
     */
    addMember(data : IMember) : void {
        this.companyMembers.push(data);
    }

    /**
     * @description Get the data of the companies.
     * @returns {ICompany[]}
     */
    getCompaniesData() : ICompany[] {
        return this.companiesData;
    }

    /**
     * @description Return the company which id equals _id.
     * @param _id {ICompany} 
     * @returns {ICompany}
     */
    getCompany(_id : string) : ICompany {
        for (let i : number = 0; i < this.companiesData.length; ++i) {
            if (this.companiesData[i].id === _id) {
                return this.companiesData[i];
            }
        }
        return {name: "Not defined", id: "Null"};
    }

    /**
     * @description Get the members of a specific company.
     * @param company_id {string} id of the specific company.
     * @returns {IMember[]}
     */
    getCompanyMembers(company_id : string) : IMember[] {
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
     * @description Emit changes to React components.
     * @returns {void}
     */
    emitChange() : void {
        this.emit(CompanyStore.CHANGE_EVENT);
    }

    /*
     i seguenti metodi sono richiamati nella dashboard
     */

    /**
     * @description attach a React component as a listener to this store
     * @param callback {() => void} when a change event is triggered, the listener execute the callback
     * @returns {void}
     */
    addChangeListener(callback : () => void) : void {
        this.on(CompanyStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback {() => void} when a change event is triggered, the listener execute the callback.
     * @returns {void}
     */
    removeChangeListener(callback : () => void) : void {
        this.removeListener(CompanyStore.CHANGE_EVENT, callback);
    }

}

/**
* @description The companyStore object to export as a singleton.
*/
let store : CompanyStore = new CompanyStore();

export default store;

