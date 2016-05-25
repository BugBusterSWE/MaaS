import Constants from "../constants/constants.ts"
import {IMember, ICompany} from "../actions/companyActionCreator";
import {DispatcherCompaniesData} from "../actions/companyActionCreator";
import {EventEmitter} from "events";
import {Action} from "../dispatcher/dispatcher";

let CHANGE_EVENT : string = "change";

class CompanyStore extends EventEmitter {

    companiesData : Array<ICompany> = [];
    companiesMembers : Array<IMember> = [];

    constructor() {
        super();
        this.actionRegister(this);
    }

    actionRegister(companyStore : CompanyStore) : void {

        DispatcherCompaniesData.register(function
            (action : Action<Constants, ICompany[]>) : void {
            companyStore.updateData(action.data);
            companyStore.emitChange();
        });
    }

    updateData(data : Array<ICompany>) : void {
        this.companiesData = data;
    }

    updateMembers(data : Array<IMember>) : void {
        this.companiesMembers = data;
    }

    addMember(data : IMember) : void {
        this.companiesMembers.push(data);
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

    /*
    Todo: fix me
    getCompaniesMembers(company_id) : Array<IMember> {
        let members = [];
        console.log(this.companiesMembers);
        for(let i = 0; i< this.companiesMembers.length; ++i ) {
            if(this.companiesMembers[i].company == company_id) {
                members.push(this.companiesMembers[i]);
            }
        }
        return members;
    }*/

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

