import Map from "./map"

/**
 * Class to check if a json data has been structure as a DSLStructure.
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Andrea Mantovani | Completed class DSLChecker | 07/05/2016 |
 * | Andrea Mantovani | Create class | 06/05/2016 |
 *
 * @author Andrea Mantovani
 * @license MIT
 */
class DSLChecker {
    private flowControl : Map<(struct : Object, id : string) => boolean>;

    /**
     * @description
     * Default constructor.
     * @return {DSLChecker}
     * This.
     */
    constructor() {
        this.flowControl                = {}; // Initialize

        this.flowControl["cell"] = (
            struct : Object,
            id : string
        ) : boolean => {
            return this.checkLeaf(struct, id);
        };

        this.flowControl["collection"] = (
            struct : Object,
            id : string
        ) : boolean => {
            return this.checkCollection(struct, id);
        };

        this.flowControl["dashboard"] = (
            struct : Object,
            id : string
        ) : boolean => {
            return this.checkDashboard(struct, id);
        };

        this.flowControl["document"] = (
            struct : Object,
            id : string
        ) : boolean => {
            return this.checkDocument(struct, id);
        };

        this.flowControl["index"] = (
            struct : Object,
            id : string
        ) : boolean => {
            return this.checkIndex(struct, id);
        };

        this.flowControl["leaf"] = (
            struct : Object,
            id : string
        ) : boolean => {
            return this.checkLeaf(struct, id);
        };
    }

    /**
     * @description
     * Check if data represents a DSLStructure. The data use the editor to be
     * create. Therefore, is not necessary all control.
     * @param data {Object}
     * JSON valid data.
     * @return {boolean}
     * True if data is a savable structure into DB, false otherwise.
     * @throws {Error}
     */
    public check(data : Object) : boolean {
        if (data === undefined) {
            throw new Error("The param 'data' is undefined");
        }

        let root : string = data["root"];

        // No root found
        if (root === undefined) {
            return false;
        }

        let struct : Object = data[root];

        if (struct === undefined) {
            throw new Error("Unexpected finish of structure");
        }

        let type : string = struct["type"];

        if (type === undefined) {
            throw new Error(
                `The attribute 'type' of the element ${root} is not defined`
            );
        }

        let follow : (struct : Object, id : string) => boolean
            = this.flowControl[type];

        if (follow === undefined) {
            throw new Error(
                `The value ${type} as 'type', in the elemen ${root}, no ` +
                `math with anything expected`
            );
        }

        // Catch all exception throw from the innested calls.
        try {
            return follow(data, root);

        } catch (err) {
            throw err;
        }
    }

    /**
     * @description
     * Return true if the collection created it is right.
     * @param data {Object}
     * JSON valid data
     * @param id {string}
     * Id of the collection structure into *data*
     * @return {boolean}
     * True if be start here is possible reach a leaf structure.
     * @throws {Error}
     */
    private checkCollection(data : Object, id : string) : boolean {
        // No collection found
        if (data[id] === undefined) {
            return false;
        }

        // Extract the model of the collection
        let collection : Object = this.extractModel(data, id);
        let actions : Array<string> = collection["action"];
        let index : string = collection["index"];
        let document : string = collection["document"];

        if (actions === undefined) {
            throw new Error(
                `The collection ${id} don't have a setted action attribute`
            );
        }

        if (index === undefined) {
            throw new Error(
              `The collection ${id} don't have a setted index attribute`
            );
        }

        return (
            this.checkLeafs(data, actions)                  &&
            this.flowControl["index"](data, index)          &&
            this.flowControl["document"](data, document)
        );
    }

    /**
     * @description
     * Return true if the dashboard created it is right.
     * @param data {Object}
     * JSON valid data
     * @param id {string}
     * Id of the dashboard structure into *data*
     * @return {boolean}
     * True if be start here is possible reach a leaf structure.
     * @throws {Error}
     */
    private checkDashboard(data : Object, id : string) : boolean {
        // No collection found
        if (data[id] === undefined) {
            return false;
        }

        // Extract the model of the dashboard
        let dashboard : Object = this.extractModel(data, id);
        let rows : Array<string> = dashboard["rows"];

        if (rows === undefined) {
            throw new Error(
                `The dashboard ${id} don't have a setted rows attribute`
            );
        }

        // Is similar at what to happen in the function checkLeafs
        let correct : boolean = true;

        rows.forEach((row : string) => {
            // Get type for the current row
            let type : string = this.extractType(data, row);
            correct = correct && this.flowControl[type](data, row);
        });

        return correct;
    }

    /**
     * @description
     * Return true if the Document created it is right.
     * @param data {Object}
     * JSON valid data
     * @param id {string}
     * Id of the document structure into *data*
     * @return {boolean}
     * True if be start here is possible reach a leaf structure.
     * @throws {Error}
     */
    private checkDocument(data : Object, id : string) : boolean {
        // No collection found
        if (data[id] === undefined) {
            return false;
        }

        // Extract the model of Document
        let document : Object = this.extractModel(data, id);
        let actions : Array<string> = document["action"];
        let rows : Array<string> = document["row"];

        if (actions === undefined) {
            throw new Error(
                `The document ${id} don't have a setted action attribute`
            );
        }

        if (rows === undefined) {
            throw new Error(
                `The document ${id} don't have a setted row attribute`
            );
        }

        return (this.checkLeafs(data, actions) && this.checkLeafs(data, rows));
    }

    /**
     * @description
     * Return true if the Index created it is right.
     * @param data {Object}
     * JSON valid data
     * @param id {string}
     * Id of the index structure into *data*
     * @return {boolean}
     * True if be start here is possible reach a leaf structure.
     * @throws {Error}
     */
    private checkIndex(data : Object, id : string) : boolean {
        // No collection found
        if (data[id] === undefined) {
            return false;
        }

        // Extract the model of Index
        let index : Object = this.extractModel(data, id);
        let columns : Array<string> = index["column"];

        if (columns === undefined) {
            throw new Error(
              `The index ${id} don't have a setted column attribute`
            );
        }

        return this.checkLeafs(data, columns);
    }

    /**
     * @description
     * Return true if the general leaf created it is right.
     * @param data {Object}
     * JSON valid data
     * @param id {string}
     * Id of the leaf structure into *data*
     * @return {boolean}
     * True if is a really leaf, false otherwise.
     * @throws {Error}
     */
    private checkLeaf(data : Object, id : string) : boolean {
        // No collection found
        if (data[id] === undefined) {
            return false;
        }

        /*
         Common model for any leaf. If no exception is throw, the leaf will
         be correct.
         */
        this.extractModel(data, id);
        return true;
    }

    /**
     * @description
     * Call the *flowControl* for the case 'leaf' for each leafs.
     * @param data {Object}
     * JSON valid data
     * @param ids {Array<string>}
     * Ids of each leafs
     * @return {boolean}
     * True if each calls at the *flowControl* returns true.
     * @throws {Error}
     */
    private checkLeafs(
        data : Object,
        ids : Array<string>
    ) : boolean {
        let correct : boolean = true;

        ids.forEach((id : string) => {
            /*
             Follow the control. If each calls at the flowControl returns true,
             the structure will be correct. This because, also if only once
             call of flowControl returns false, the operator && will keep
             variable correct to the false.
             */
            correct = correct && this.flowControl["leaf"](data, id);
        });

        return correct;
    }

    /**
     * @description
     * Get the pModel inside any structure.
     * @param data {Object}
     * JSON valid data
     * @param id {string}
     * Id of the structure into *data*
     * @return {Object}
     * The content of **pModel** attribute.
     * @throws {Error}
     */
    private extractModel(data : Object, id : string) : Object {
        let model : Object = data[id]["pModel"];

        if (model === undefined) {
            throw new Error(
                `The pModel for the structure ${id} is expected`
            );
        }

        return model;
    }

    /**
     * @description
     * Extract type from object received with the id passed by argument.
     * @param data {Object}
     * JSON valid data
     * @param id {string}
     * Key to access to the content
     * @return {string}
     * The type of object
     * @throws {Error}
     */
    private extractType(data : Object, id : string) : string {
        let struct : Object = data[id];

        if (struct === undefined) {
            throw new Error(
                "Unexpected finish of structure"
            )

        }

        let type : string = struct["type"];

        if (type === undefined) {
            throw new Error(
                `The attribute 'type' of the element ${id} ` +
                "is not defined"
            )
        }

        return type;
    }
}

export default DSLChecker;
