/*
TODO: Create one class for each structure in a DSL ( cell, collection, ... )
TODO: In any class insert a static method to check the form of a Object
TODO: Check type of attribute
TODO: Create DSLStructure ( id: number, value: structure ).
TODO: Check attribute generated automatically
*/

import Map from "./map.ts";

/**
 * Class to check if a json data has been structure as a DSLStructure.
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  | 
 * | Andrea Mantovani | Create class | 06/05/2016 |
 *
 * @author Andrea Mantovani
 * @license MIT
 */
class DSLChecker {
    /**
     * @description
     * For any structure in the DSL, it store the set of mandatory params.
     */
    private mandatory : Map<Array<string>>;

    /**
     * @description
     * For any structure in the DSL, it store the set of optional params.
     */
    private optional : Map<Array<string>>;

    /**
     * @description
     * Public constructor, it do anything.
     * @return {DSLChecker} This.
     */
    public constructor() {
        this.setMandatory();
        this.setOptional();
    }

    /**
     * @description
     * Check if data rappresent a DSLStructure. If true, it returns a
     * DSLCecker setted with the values inside data, else, it throw a
     * exception.
     *
     * @param data {Object} JSON valid data.
     * @return {DSLStructure} Savable structure into DB.
     */
    public check(data : Object) : boolean {
        if (data !== undefined) {
            /*
            Create a deep copy of data. In this way, I can modify
            *copy* and not to create side effect.
             */
            let copy : Object = JSON.parse(JSON.stringify(data));

            if (copy["root"] !== undefined) {
                // The only once that it isn't a dsl component
                delete copy["root"];
                let keys : Array<string> = Object.keys(data);

                let error : boolean = false;
                let index : number = 0;

                /*
                For each dsl components. It will stop when a error
                is occurred or no components have errors.
                 */
                while (!error && index < keys.length) {
                    let attribute : Object = copy[keys[index]];
                    let type : string = attribute["pModel"]["type"];

                    error = !this.allRequiredAttributes(
                        attribute,
                        this.mandatory[type]
                    );

                    // Next key
                    index += 1;
                }

                return error;

            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * @description
     * Check if all required attributes are present in the structure.
     * @param struct {Object}
     * Part of DSL Structure to check mandatory attributes.
     * @return {boolean}
     * True if all mandatory params are present, false otherwise.
     */
    private allRequiredAttributes(
        struct : Object,
        required : Array<string>
    ) : boolean {
        let correct : boolean = true;
        let index : number = 0;

        while (correct && index < required.length) {
            // Check if the param exists
            correct = (struct[required[index]] !== undefined);

            // Next attribute
            index += 1;
        }

        return correct;
    }

    /**
     * @description
     * Set all mandatory params of the DSL structures into *mandatory* Map.
     */
    private setMandatory() : void {
        this.mandatory["action"]     = ["set"];
        this.mandatory["cell"]       = ["input", "type"];
        this.mandatory["collection"] = ["name"];
        this.mandatory["column"]     = ["name"];
        this.mandatory["dashboard"]  = ["name"];
        this.mandatory["dashrow"]    = [];
        this.mandatory["document"]   = [];
        this.mandatory["index"]      = [];
        this.mandatory["row"]        = ["name"];
    }

    /**
     * @description
     * Set all optional params of the DSL structures into *optional* Map.
     */
    private setOptional() : void {
        this.optional["action"]     = [];
        this.optional["cell"]       = [];
        this.optional["collection"] = [
            "label",
            "id",
            "weight"
        ];
        this.optional["column"]     = [
            "label",
            "sortable",
            "selectable",
            "trasformation"
        ];
        this.optional["dashboard"]  = [
            "rows"
        ];
        this.optional["dashrow"]    = [];
        this.optional["document"]   = [
            "populate"
        ];
        this.optional["index"]      = [
            "perpage",
            "populate",
            "sortby",
            "order",
            "query"
        ];
        this.optional["row"]        = [
            "label",
            "transformation"
        ];
    }
}
