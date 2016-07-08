import * as React from "react";
import * as ReactDOM from "react-dom";

/**
 * This interface represents the props of the {ErrorMessageComponent}.
 */
export interface IErrorProps {
    error : string;
}

/**
 * <p>This class represents the error message component
 * that is used in the pages of MaaS.</p>
 *
 * @history
 * | Author        | Action Performed | Data       |
 * |---------------|------------------|------------|
 * | Davide Rigoni | Create class     | 20/05/2016 |
 *
 * @author Davide Rigoni
 * @license MIT
 */
class ErrorMessageComponent extends React.Component<IErrorProps, void> {

    /**
     * @description Default constructor.
     * @return {ErrorMessageComponent}
     */
    constructor() {
        super();
    }

    /**
     * @description
     * <p>Render method of the component.
     * It renders the errorMessage component.</p>
     * @return {JSX.Element}
     */
    public render() : JSX.Element {
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
