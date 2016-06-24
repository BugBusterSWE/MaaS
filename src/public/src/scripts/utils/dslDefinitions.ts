/**
 * Created by emanuele on 24/06/16.
 */

export interface IDashboard {
    rows : [{
        type : "collection" | "document" | "cell",
        id : string
    }]
}
