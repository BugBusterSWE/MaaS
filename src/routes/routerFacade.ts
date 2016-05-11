/**
 * Here we export all route files. You need only to import this file.
 * @history
 * |      Author     | Action Performed |      Data      |
 * |       ---       |        ---       |       ---      |
 * | Matteo Di Pirro | Create module     | 06/05/2016     |
 *
 * @author Matteo Di Pirro
 * @license MIT
 */

// Import the routes
import DSLRouter from "./dslRouter";
import UserRouter from "./userRouter";
import DatabaseRouter from "./databaseRouter";
import CompanyRouter from "./companyRouter";

// Export the routes
export {default as DatabaseRouter} from "./databaseRouter";
export {default as DSLRouter} from "./dslRouter";
export {default as UserRouter} from "./userRouter";
export {default as CompanyRouter} from "./companyRouter";
