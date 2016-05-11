/**
 * Interface to expose the utility of map, it associates the key with the value.
 * @history
 * | Author | Action Performed | Data |
 * | ---    | ---              | ---  |
 * | Andrea Mantovani | Create interface | 06/05/2016 |
 *
 * @author Andrea Mantovani
 * @license MIT
 */
interface Map<value> {
    [k : string] : value;
}

export default Map;
