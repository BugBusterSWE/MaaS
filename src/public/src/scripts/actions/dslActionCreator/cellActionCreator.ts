import Dispatcher, {Action, ActionError} from "../../dispatcher/dispatcher";
import cellAPIs from "../../utils/dslAPI/cellAPI";
import {ICell} from "../../utils/dslDefinitions";

export let DispatcherCellData : Dispatcher<Action<ICell>> =
    new Dispatcher<Action<ICell>>();

/**
 * This class represents the creator of the action of the cell.
 *
 * @history
 * | Author           | Action Performed                    | Data       |
 * |------------------|-------------------------------------|------------|
 * | Emanuele Carraro | Create CellActionCreator class      | 05/07/2016 |
 *
 * @author Emanuele Carraro
 * @license MIT
 *
 */
class CellActionCreator {

    /**
     * @description Dispatch the action to get the data of the cell.
     */
    public getCellData() : void {
        console.log("get cell data");
        cellAPIs
            .getCellData()
            .then(function (data : ICell) : void {
                DispatcherCellData.dispatch({
                    actionData : data,
                    actionError : undefined
                })
            })
    }

}

let cellActionCreator : CellActionCreator =
    new CellActionCreator();
export default cellActionCreator;
