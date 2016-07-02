/**
 * Created by emanuele on 24/06/16.
 */

/**
 * <p> This interface represents a dashboard.
 * It is composed by 0,1,2, ... k rows
 * of type IDashboardRow. </p>
 */
export interface IDashboard {
    rows : IDashboardRow[]
}

/**
 * <p> This interface represents the row
 * of a dashboard.
 * Its type can be a collection,
 * a document or a cell. </p>
 */
export interface IDashboardRow {
    type : "collection" | "document" | "cell",
    id : string;
}

/**
 * <p> This interface defines
 * some basic informations about
 * a collection. </p>
 */
export interface ICollection {
    id : string;
    name : string;
    label : string;
}

/**
 * <p> This interface defines
 * the header of the collection
 * table. </p>
 */
export interface IHeaderIndexPage {
    label : string;
    name : string;
    selectable : boolean;
    sortable : boolean;
}

/**
 * <p> This interface defines
 * the index page in MaaS.
 * It represents the whole
 * collection table with
 * all the documents in it. </p>
 */
export interface IIndexPage {
    id : string;
    name : string;
    label : string;
    numdocs : number;
    perpage : number;
    header : Array<IHeaderIndexPage>;
    documents : Array<IIndexDoc>;
}

/**
 * <p> This interface represents all
 * the documents in a collection. </p>
 */
export interface IIndexDoc {
    id : string;
    data : Array<IInteractiveDocument>
}

/**
 * <p> This interface represents
 * a document in a collection. </p>
 */
export interface IInteractiveDocument extends IDocument {
    selectable : boolean;
    sortable : boolean;
}

/**
 * <p> This interface represents
 * a document in MaaS.
 * It is extended by IInteractiveDocument. </p>
 */
/* tslint:disable: no-any */
export interface IDocument {
    id : string;
    label : string;
    name : string;
    data : any;
}
/* tslint:enable: no-any */

/**
 * <p> This interface represents a cell.
 * It can contains only one value. </p>
 */
export interface ICell {
    id : string;
    label : string,
    type : "image" | "data" | "string" | "number" | "link",
    value : string | {
        collection : string,
        query : string
    }
}
