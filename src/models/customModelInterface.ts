import * as mongoose from "mongoose";
/**
 * This is the base models class and contains some useful methods to perform
 * basic operations with MongoDB.
 * @history
 * |      Author     |  Action Performed |      Data      |
 * |       ---       |         ---       |       ---      |
 * | Andrea Mantovani | Use export default | 12/05/2016  |
 * | Luca Bianco     | Created interface | 10/05/2016     |
 *
 * @author Luca Bianco
 * @license MIT
 */
interface CustomModel extends mongoose.Document {}

export default CustomModel;