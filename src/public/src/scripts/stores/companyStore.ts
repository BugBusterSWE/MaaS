import Dispatcher from "../dispatcher/dispatcher.ts";
import Constants from "../constants/myConstants.ts"
import * as Events from "events";

let CHANGE_EVENT : string = "change";

class CompanyStore extends Events.EventEmitter {

    companiesData : Array<Object> = [];
    companiesMembers : Array<Object> = [];

    constructor() {
        super();
        this.actionRegister(this);
    }

    actionRegister(companyStore : CompanyStore) : void {

        Dispatcher.register(function (payload) : void {
            let action = payload.action;
            switch (action.actionType) {

                case "companiesData":
                    companyStore.updateData(action.data);
                    companyStore.emitChange();
                    break;

                case "companiesMembers":
                    companyStore.updateMembers(action.data);
                    companyStore.emitChange();
                    break;
                
               /* case "newCompanyMember": 
                    companyStore.addMember(action.data);
                    companyStore.emitChange();*/
                case Constants.COMPANIES_MEMBERS_ADD:
                    companyStore.addMember(action.data);
                    companyStore.emitChange();
                default:
                // Do nothing​
            }
        });
    }

    updateData(data : Array<Object>) : void {
        this.companiesData = data;
    }

    updateMembers(data: Array<Object>) : void {
        this.companiesMembers = data;
    }
    
    addMember(data : Object) : void {
        this.companiesMembers.push(data);
    }

    getCompaniesData() : Array<Object> {
        return this.companiesData;
    }

    getCompany(_id) : Object {
        for(let i = 0; i < this.companiesData.length; ++i) {
            if(this.companiesData[i]._id === _id) {
                return this.companiesData[i];
            }
        }
        return {name: 'Not defined'};
    }

    getCompaniesMembers(company_id) : Array<Object> {
        let members = [];
        console.log(this.companiesMembers);
        for(let i = 0; i< this.companiesMembers.length; ++i ) {
            if(this.companiesMembers[i].company == company_id) {
                members.push(this.companiesMembers[i]);
            }
        }
        return members;
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

