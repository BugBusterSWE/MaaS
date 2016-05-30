import * as React from "react";
import Navbar from "../navbar/navbarNotLogged";

/*import Actions from "../../actionCreators/collectionActionCreator"
//import Header from "../components/header";
//import * as ReactRouter from "react-router"; */

class Home extends React.Component<void, void> {
    /*
     * I have disabled max-line-lenght rule cause is impossible to
     * correctly format html in 80 columns
     */
    /* tslint:disable: max-line-length */
    render() : JSX.Element {
        return(
            <div>
                <Navbar></Navbar>
                <div id="contentBody" className="container">
                    <div className="center-align card-panel teal light-blue white-text z-depth-5">
                        <h1>Benvenuti in MaaS</h1>
                    </div>
                </div>
            </div>
        );
    }
    /* tslint:enable: max-line-length */
}

export default Home;
