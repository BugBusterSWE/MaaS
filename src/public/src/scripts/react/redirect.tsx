import * as React from "react";
//import Actions from "../../actionCreators/collectionActionCreator.ts"
//import Header from "../components/header.tsx";
import * as ReactRouter from "react-router";
import Navbar from "./navbar/navbarNotLogged.tsx";

export default class Login extends React.Component {
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
