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
    label : String,
    type : "image" | "data" | "string" | "number" | "link",
    value : String | {
        collection : String,
        query : String
    }
}
