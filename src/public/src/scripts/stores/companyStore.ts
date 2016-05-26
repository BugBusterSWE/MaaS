import Constants from "../constants/constants.ts"
import {IMember, ICompany, IAddCompany} from "../actions/companyActionCreator";
import {DispatcherCompaniesData, DispatcherCompaniesMembers, DispatcherAddCompany} from "../actions/companyActionCreator";
import {EventEmitter} from "events";
import {Action} from "../dispatcher/dispatcher";

let CHANGE_EVENT : string = "change";

class CompanyStore extends EventEmitter {

    companiesData : ICompany[] = [];
    companyMembers : IMember[] = [];

    constructor() {
        super();
        this.actionRegister(this);
    }

    actionRegister(companyStore : CompanyStore) : void {

        DispatcherCompaniesData.register(
            function (action : Action<Constants, ICompany[]>) : void {
                companyStore.updateData(action.data);
                companyStore.emitChange();
            }
        );
        
        DispatcherCompaniesMembers.register(
            function (action : Action<Constants, IMember[]>) : void {
                companyStore.updateMembers(action.data);
                companyStore.emitChange();
            }
        )
        
        DispatcherAddCompany.register(
            function (action : Action<Constants, IAddCompany>) : void {
                companyStore.addCompany(action.data.company);
                companyStore.addMember(action.data.user);
            }
        )
    }

    updateData(data : ICompany[]) : void {
        this.companiesData = data;
    }

    updateMembers(data : IMember[]) : void {
        this.companyMembers = data;
    }
    
    addCompany(data : ICompany) : void {
        this.companiesData.push(data);
    }

    addMember(data : IMember) : void {
        this.companyMembers.push(data);
    }

    getCompaniesData() : Array<ICompany> {
        return this.companiesData;
    }

    getCompany(_id : string) : ICompany {
        for (let i : number = 0; i < this.companiesData.length; ++i) {
            if (this.companiesData[i].id === _id) {
                return this.companiesData[i];
            }
        }
        return {name: "Not defined", id: "Null"};
    }

    getCompanyMembers(company_id) : Array<IMember> {
        // Questo ciclo for e' utile? Non se ricevo i dati giusti al caricamento di showCompaniesMembers
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

    emitChange() : void {
        this.emit(CHANGE_EVENT);
    }

    /*
     i seguenti metodi sono richiamati nella dashboard
     */

    addChangeListener(callback : () => void) : void {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback : () => void) : void {
        this.removeListener(CHANGE_EVENT, callback);
    }

}

let store : CompanyStore = new CompanyStore();

export default store;

