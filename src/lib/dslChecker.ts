/**
 * Class to check if a json data is structured as a DSLStructure.
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
       * Public construtorn, it do anything.
       * @return {DSLChecker} This
       */
      public constructor() {}
      
      /**
       * Check if data rappresent a DSLStructure. If true, it returns a 
       * DSLCecker setted with the values inside data, else, it throw a
       * exception.
       * 
       * @param data {Object} JSON valid data
       * @return {DSLStructure} Savable structure into DB
       * @throws {DSLParseException}
       */
      public check( data : Object ) : DSLStructure {
      	     let structure : DSLStructure = new DSLStructure();

	     

	     
      }
}