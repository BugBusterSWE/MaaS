import * as React from "react";
import * as ReactDOM from "react-dom";

interface IErrorProps{
    error: string
}

class errorMessageComponent extends React.Component<IErrorProps, void> {

    /* tslint:disable: max-line-length */
    render() : JSX.Element {
        if(this.props.error != "") {
            return (
                <div className="col s12 card-panel red darken-4 white-text center-align">
                    {this.props.error}
                </div>
            );
        }
        else {
            return (
                <span>
                </span>
            );
        }
    }
    /* tslint:enable: max-line-length */
}

export default errorMessageComponent;
