import * as React from "react";
import Navbar from "../navbar/navbarNotLogged.tsx";

//import Actions from "../../actionCreators/collectionActionCreator.ts"
//import Header from "../components/header.tsx";
//import * as ReactRouter from "react-router";

class Home extends React.Component<void, void> {
    render() {
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
}

export default Home;