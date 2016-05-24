class MyConstants {
    SERVER_ACTION : string;
    VIEW_ACTION : string;
    COLLECTION_EVENT : string = "collectionEvent";
    COMPANIES_DATA : string = "companiesData";
    COMPANIES_MEMBERS : string = "companiesMembers";
    COMPANIES_MEMBERS_ADD : string = "companiesMembersAdd";
    LOGIN : string = "login";
    LOGOUT : string = "logout";
}

let constants : MyConstants = new MyConstants();

export default constants;
