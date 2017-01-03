import React, { Component, PropTypes } from 'react';
import transitions from '../_utils/transitions';

function getStyles(props) {
    const {
        rounded,
        circle,
        transitionEnabled,
        zDepth,
    } = props;
    return {
        root: {
            /*color: paper.color,
            backgroundColor: paper.backgroundColor,*/
            transition: transitionEnabled && transitions.easeOut(),
            boxSizing: 'border-box',
            /*fontFamily: baseTheme.fontFamily,*/
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            /*boxShadow: paper.zDepthShadows[zDepth - 1],*/
            borderRadius: circle ? '50%' : rounded ? '2px' : '0px',
        },
    };
}

class Paper extends Component {
    static propTypes = {
        children: PropTypes.node,
        circle: PropTypes.bool,
        rounded: PropTypes.bool,
        style: PropTypes.object,
        transitionEnabled: PropTypes.bool,
        zDepth: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
    };

    static defaultProps = {
        circle: false,
        rounded: true,
        transitionEnabled: true,
        zDepth: 1,
    };

    render() {
        const {
            children,
            circle,
            rounded,
            style,
            transitionEnabled,
            zDepth,
            ...other
        } = this.props;
        return ( 
            <div {...other} style={this.props.style}> { children } </div>
        );
    }
}

export default Paper;
