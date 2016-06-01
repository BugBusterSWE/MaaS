import * as React from "react";
import Navbar from "../navbar/navbarNotLogged";


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

    /* tslint:disable: max-line-length */
    render() : JSX.Element {
        return(
            <div>
                <Navbar></Navbar>
                <div id="contentBody" className="container">
                    <div className="center-align card-panel teal light-blue white-text z-depth-5">
                        <h1>Welcome to MaaS</h1>
                    </div>
                </div>
            </div>
        );
    }
    /* tslint:enable: max-line-length */
}

export default Home;
