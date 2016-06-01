import * as React from "react";
import * as ReactDOM from "react-dom";

interface IErrorProps{
    error: String
}

class errorMessageComponent extends React.Component<IErrorProps, void> {

    /* tslint:disable: max-line-length */
    render() : JSX.Element {
        if(this.props.error != null)
        {
            return(
                <div className="row">
                    <div className="col s12 card-panel red darken-4 white-text center-align">
                        {this.props.error}
                    </div>
                </div>
            );
        }
    }
}

export default errorMessageComponent;
