import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IErrorProps {
    error : string;
}

class ErrorMessageComponent extends React.Component<IErrorProps, void> {

    render() : JSX.Element {
        if (this.props.error) {
            /* tslint:disable: max-line-length */
            return (
                <div className="col s12 card-panel red darken-4 white-text center-align">
                    {this.props.error}
                </div>
            );
            /* tslint:enable: max-line-length */
        } else {
            /* tslint:disable: max-line-length */
            return (
                <span>
                </span>
            );
            /* tslint:enable: max-line-length */
        }
    }
    /* tslint:enable: max-line-length */
}

export default ErrorMessageComponent;
