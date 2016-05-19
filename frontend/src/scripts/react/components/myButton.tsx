/// <reference path="../../../../typings/react/react.d.ts" />

import * as React from "react";
import Actions from "../../actionCreators/collectionActionCreator.ts"

export default class MyButton extends React.Component {

    /*
    bind(this) su _onClickDestroy, altrimenti segnalerà errore in compilazione:
    function _onClickDestroy is not defined
     */

    render() {
        return(
            <div>
                <button className="btn-floating btn-large waves-effect waves-light blue"
                    onClick={this._onClickDestroy.bind(this)}>
                    <i className="material-icons right">delete</i>
                </button>
            </div>
        );
    }

    _onClickDestroy() {
        Actions.destroy(this.props.id);
    }

}
