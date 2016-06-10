import * as React from "react";
import Navbar from "../navbar/navbar";
import {PermissionLevel} from "../../stores/sessionStore"


/**
 * This class represents the {Home} page.
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class Home extends React.Component<void, void> {

    /**
     * @description Default constructor.
     * @return {Home}
     */
    constructor() {
        super();
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the home page.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
        /* tslint:disable: max-line-length */
        return(
            <div>
                <Navbar userPermission={PermissionLevel.GUEST} />
                <div id="contentBody" className="container">
                    <div className="center-align card-panel teal light-blue white-text z-depth-5">
                        <h1>Welcome to MaaS</h1>
                    </div>
                </div>
            </div>
        );
        /* tslint:enable: max-line-length */
    }
}


export default Home;
