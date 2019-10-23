import React from 'react';
import { arrayOf, node, shape, string } from 'prop-types';


class DefaultLayout extends React.PureComponent {
    static propTypes = {
        children: node.isRequired,
        breadcrumbs: arrayOf(
            shape({
                link: string.isRequired,
                name: string.isRequired,
            })
        ),
    };

    static defaultProps = {
        breadcrumbs: null,
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
