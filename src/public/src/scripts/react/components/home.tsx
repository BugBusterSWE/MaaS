import * as React from "react";
import Navbar, {PermissionLevel} from "../navbar/navbar";


/**
 * Home is a react component that lives in the Home Page
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class Home extends React.Component<void, void> {

    render() : JSX.Element {
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
