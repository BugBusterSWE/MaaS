/**
 * Created by emanuele on 24/06/16.
 */

export interface IDashboard {
    rows : IDashboardRow[]
}

export interface IDashboardRow {
    type : "collection" | "document" | "cell",
    id : string;
}

export interface ICell {
    id : string;
    label : string,
    type : "image" | "data" | "string" | "number" | "link",
    value : string | {
        collection : string,
        query : string
    }
}
/* tslint:disable: no-any */
export interface IDocument {
    id : string;
    label : string;
    name : string;
    data : any;
}
/* tslint:enable: no-any */

export interface ICollection {
    id : string;
    name : string;
    label : string;
}

export interface IHeaderIndexPage {
    label : string;
    name : string;
    selectable : boolean;
    sortable : boolean;
}

export interface IIndexPage {
    id : string;
    name : string;
    label : string;
    numdocs : number;
    perpage : number;
    header : Array<IHeaderIndexPage>;
    documents : Array<IIndexDoc>;
}

export interface IIndexDoc {
    id : string;
    data : Array<IInteractiveDocument>
}

export interface IInteractiveDocument extends IDocument {
    selectable : boolean;
    sortable : boolean;
}
