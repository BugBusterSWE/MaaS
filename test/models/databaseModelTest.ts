import {DatabaseModel, database} from "../../src/models/databaseModel";
import {DatabaseDocument} from "../../src/models/databaseModel";
import * as Chai from "chai";
import {readFileSync, writeFileSync} from "fs";


/**
 * DatabaseModel manage all connections to MongoDB companies databases.
 * Implements model and schema of MongooseJS.
 *
 * This model represent a connection to a company.
 *
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Davide Polonio | Create class | 06/05/2016 |
 *
 * @author Davide Polonio
 * @copyright MIT
 *
 *
 */

describe("DatabaseModelTest", () => {
   
    let toTest : DatabaseModel; // Name of the object to test
    let testJson : string;
    let configurationBackup : string;
    let companyID : string = "123456789";

    // Call one of the many function that are in the Mocha framework
    before(function (): void {

        toTest = database;

	testJson = JSON.parse(readFileSync(
	    "test/config/mongoTest.json",
	    "utf-8"
	));

	configurationBackup = JSON.parse(readFileSync(
	    "src/config/mongoParameters.json",
	    "utf-8"
	));

	writeFileSync(
	     "src/config/mongoParameters.json",
	     testJson,
	     "utf-8"	
	);
	
	/* Create databases */
	toTest.create({
             "name" : "testingAdd",
             "idOwner" : "123456789",
             "idDatabase" : "A1",
             "collections" : ["A", "B", "C"]
        });

	toTest.create({
	     "name" : "testingAdd1",
	     "idOwner" : "01234567",
	     "idDatabase" : "A2",
	     "collections" : ["A", "B", "C"] 				
	});	

    });

    after( function() : void {

	writeFileSync(
		"src/config/mongoParameters.json",
		JSON.stringify(configurationBackup),
		"utf-8"
	);	
    });

    // This function starts a single test
    describe("#GetDatabases", () => {
        it("should return all databases for an existing company", () => {
		
            toTest.getAllForCompany(companyID)
	    .then(function(doc : DatabaseDocument) : void {
		// how can I test the returned databases?
		Chai.expect(doc["_id"]).to.equal(companyID);
	    });  
        }); 
    });

    describe("#Add", () => {
        it("should add a database to a company", () => {
                toTest.create({
			"name" : "testingAdd",
			"idOwner" : companyID,
			"idDatabase" : "A1",
			"collections"   : ["A", "B", "C"]	
		}).then( function () : void { 
		         /* test if the company has been added, 
			    use the  method */
			 toTest.getAllForCompany(companyID)
			 .then( function(doc : DatabaseDocument) : void {
				Chai.expect(doc["_id"]).to.equal(companyID);
		
	
			 });
		});
        });
    });

    describe("#GetDatabases1", () => {
            it("should return all databases for a non existent company", () => {
		toTest.getAllForCompany("01234")
                .then(function(doc : DatabaseDocument) : void {
                // how can I test the returned databases?
                Chai.expect(doc).null;
            });

        }); 
    });    

    describe("#GetDatabase", () => {
        it("should get a single database for an existing company", () => {
	     //there's not any function to get a single database
         

        });
    });

    describe("#GetDatabase1", () => {
        it("should get a single database for a non existent company", () => {

         

        });
    }); 

    describe("#Update", () => {
        it("should update a database for an existing company", () => {

         

        });
    });

    describe("#Update1", () => {
        it("should update a database for a non existent company", () => {

        	toTest.update(companyID, 
			{
                        "name" : "testingAdd",
                        "idDatabase" : "A1",
                        "collections"   : ["A", "B", "C"]
			})
                .then( function (data : Object) : void {
                         //test if the received data are ok
                         //how?
                });    

        });
    });   

    describe("#Remove", () => {
        it("should remove an existing database", () => {
		//there's not any function to get a single database

        });
    });

    describe("#Remove1", () => {
        it("should remove a non existent database", () => {


        }); 
    });


});
