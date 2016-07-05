import {ICell} from "../../utils/dslDefinitions"
import {DispatcherCellData}
    from "../../actions/dslActionCreator/cellActionCreator";
import {EventEmitter} from "events";
import {Action, ActionError} from "../../dispatcher/dispatcher";

/**
 * CellStore contains all the logic of all the Cell Entity.
 *
 *
 * @history
 * | Author           | Action Performed            | Data       |
 * | ---              | ---                         | ---        |
 * | Emanuele Carraro | Create class CellStore      | 5/07/2016  |
 *
 *
 * @author Emanuele Carraro
 * @copyright MIT
 */
class CellStore extends EventEmitter {

    /**
     * @description string for events management.
     */
    private static CHANGE_EVENT : string = "change";

    /**
     * @description Contains the data of the cell.
     */
    private cell : ICell = {
        id : "",
        label : "",
        type : "data",
        value : ""
    };

    /**
     * @description
     * <p>This constructor calls his super constructor.
     * It creates a CellStore and registers it to multiple
     * dispatchers. </p>
     * @return {CellStore}
     */
    constructor() {
        super();
        this.actionRegister(this);
    }

    /**
     * @description Get the data of the cell.
     * @returns {ICell}
     */
    public getCell() : ICell {
        return this.cell;
    }

    /**
     * @description Update the cell.
     * @param data {ICell} The data of the cell.
     * @returns {void}
     */
    public updateData(data : ICell) : void {
        console.log("update cell");
        this.cell = data;
    }

    /**
     * @description attach a React component as a listener to this store
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback</p>
     * @returns {void}
     */
    public addChangeListener(callback : () => void) : void {
        this.on(CellStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Remove a listener.
     * @param callback
     * <p>{() => void} when a change event is triggered, the listener execute
     * the callback.</p>
     * @returns {void}
     */
    public removeChangeListener(callback : () => void) : void {
        this.removeListener(CellStore.CHANGE_EVENT, callback);
    }

    /**
     * @description Registers the cellStore to multiple dispatchers.
     * @param store {CellStore}
     * @returns {void}
     */
    private actionRegister(store : CellStore) : void {

        DispatcherCellData.register(
            function (action : Action<ICell>) : void {
                store.updateData(action.actionData);
                store.emitChange();
            }
        );

    }

    /**
     * @description Emit changes to React components.
     * @returns {void}
     */
    private emitChange() : void {
        this.emit(CellStore.CHANGE_EVENT);
    }

}

let store : CellStore = new CellStore();
export default store;
