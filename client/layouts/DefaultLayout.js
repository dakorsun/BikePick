import React from 'react';
import { arrayOf, node, shape, string } from 'prop-types';


class DefaultLayout extends React.PureComponent {
    static propTypes = {
        children: node.isRequired,
    };

    static defaultProps = {
        user: null,
    };

    render() {
        const { children } = this.props;
        return (
            <div className="main">
                {children}
            </div>
        );
    }
}

export default DefaultLayout;
