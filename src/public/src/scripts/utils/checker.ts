/**
 *
 * @history
 * | Author           | Action Performed | Data       |
 * |------------------|------------------|------------|
 * | Emanuele Carraro | Create classes   | 3/06/2016  |
 *
 * @author Emanuele Carraro
 * @license MIT
 */


/**
 * <p>This class is the base class of the 
 * Template method. </p>
 * 
 */
abstract class Checker {

    /**
     * @description The string to check.
     */
    protected field : string;

    /**
     * @description
     * <p> It creates a Checker. </p>
     * @return {Checker}
     */
    constructor(field : string) {
        this.field = field;
    }

    /**
     * @description
     * <p> It's an abstract method that check if there is
     * an error on the string field. The type of error to
     * check is defined in the implementation in subclasses. </p>
     * @returns {boolean} Returns true if there is an error.
     */
    protected abstract customCheck () : boolean;

    /**
     * @description
     * <p>This method check if there is an error
     * on the string field. It's an algorithm that
     * changes according to what you need to check. </p>
     * @returns {boolean} Returns true if there is an error.
     */
    public check () : boolean {
       let lengthMinMax : boolean = true;
       if (this.field.length > 32 || this.field.length < 3) {
           lengthMinMax = false;
       } else {
           lengthMinMax = true;
       }
       return this.customCheck() && lengthMinMax;
    }

}

/**
 * <p>This class check if the string
 * field is empty. </p>
 * 
 */
export class EmptyChecker extends Checker {

   protected customCheck () : boolean {
       let trimmedField : string = this.field.trim();
       if (trimmedField.length == 0) {
           return false;
       } else {
           return true;
       }
   }
}


