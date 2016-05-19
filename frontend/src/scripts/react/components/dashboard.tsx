/// <reference path="../../../../typings/react/react.d.ts" />

import * as React from "react";
import MyButton from "./myButton.tsx"
import CollectionStore from "../../stores/collectionStore.ts";
import Actions from "../../actionCreators/collectionActionCreator.ts"

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { collections: CollectionStore.getData() };

        /*
        In EcmaScript6 i metodi non definiti da React
        non sono legati al giusto "this"
         */
        this._onChange = this._onChange.bind(this);
    }

    /*
     i seguenti metodi vengono richiamati in automatico
     */

    componentDidMount() : void {
        CollectionStore.addChangeListener(this._onChange);
        Actions.getData();
    }

    componentWillUnmount() : void {
        CollectionStore.removeChangeListener(this._onChange);
    }

    _onChange() : void {
        this.setState({
            collections: CollectionStore.getData()
        });
    }

    render() {
        let collectionsTable : Array<Object> = [];

        /*
        Scorre le collections presenti nel suo stato 
        e carica le collections nella variabile collectionsTable
         */
        this.state.collections.forEach(function (collection) {
            collectionsTable.push(<tr>
                <td>{collection.name}</td>
                <td>{collection.label}</td>
                <td>{collection.weight}</td>
                <td>{collection.sortable.toString()}</td>
                <td><MyButton id={collection.id}></MyButton></td>
            </tr>)});

        return (
            <div id="content" className="container">
                <div id="titles">
                    <h3 className="black-text">MyDashboard</h3>
                    <h4 className="grey-text">Collections</h4>
                </div>
                <div className="divider"></div>
                <table className="black-text striped">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Label</th>
                    <th>Weight</th>
                    <th>Sortable</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {collectionsTable}
                </tbody>
            </table>
            </div>
        ) ;
    }
}

