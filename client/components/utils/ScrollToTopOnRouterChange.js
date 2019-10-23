import React from 'react';
import { withRouter } from 'react-router-dom';
import { shape } from 'prop-types';

@withRouter
class ScrollToTopOnRouterChange extends React.PureComponent {
    static propTypes = {
        location: shape({}),
    };

    static defaultProps = {
        location: {},
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname ||
            this.props.location.search !== prevProps.location.search) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return null;
    }
}

export default ScrollToTopOnRouterChange;
