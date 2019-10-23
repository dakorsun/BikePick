import React from 'react';
import { number, node, bool, shape, string } from 'prop-types';

class AnimateHeight extends React.PureComponent {
    static propTypes = {
        expand: bool.isRequired,
        minHeight: number,
        duration: number,
        children: node.isRequired,
        style: shape({}),
        className: string.isRequired,
    };

    static defaultProps = {
        minHeight: 0,
        duration: 500,
        style: {},
    };

    constructor(props) {
        super(props);
        this.nodeRef = React.createRef();

        this.state = {
            expand: props.expand,
            height: props.minHeight,
            useTransition: true,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.expand !== state.expand) {
            return {
                expand: props.expand,
                useTransition: true,
            };
        }

        return null;
    }

    componentDidMount() {
        this.setHeight();
    }

    componentDidUpdate(prevProps) {
        if (this.props.expand !== prevProps.expand) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.setState({ useTransition: false });
            }, this.props.duration);
        }
        this.setHeight();
    }

    getMaxHeight = () => {
        if (this.nodeRef.current) {
            return Array.from(this.nodeRef.current.childNodes)
                .map(e => e.clientHeight)
                .reduce((p, c) => p + c, 0);
        }
        return this.state.height;
    };

    setHeight = () => {
        const maxHeight = this.getMaxHeight();
        if (this.props.expand) {
            if (this.state.height !== maxHeight) {
                this.setState({ height: maxHeight });
            }
        } else if (this.state.height !== this.props.minHeight) {
            this.setState({ height: this.props.minHeight });
        }
    };

    getStyles = () => {
        const styles = {
            ...this.props.style,
            height: this.state.height,
            overflow: 'hidden',
        };

        if (this.state.useTransition) {
            styles.transition = `height ${this.props.duration}ms ease`;
        }

        return styles;
    };

    render() {
        return (
            <div className={this.props.className} ref={this.nodeRef} style={this.getStyles()}>
                <div style={{ display: 'inline-block' }}>{this.props.children}</div>
            </div>
        );
    }
}

export default AnimateHeight;
