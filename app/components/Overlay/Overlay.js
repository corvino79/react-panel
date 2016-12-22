import React, { Component, PropTypes } from 'react';
import transitions from '../_utils/transitions';
import AutoLockScrolling from '../_utils/lockScrolling';

function getStyles(props, context) {

    const style = {
        root: {
            backgroundColor: '#000',
            transition: props.transitionEnabled && `${transitions.easeOut('0ms', 'left', '400ms')}, ${transitions.easeOut('400ms', 'opacity')}`,
        },
    };

    if (props.show) {
        Object.assign(style.root, {
            left: 0,
            opacity: 1,
            transition: `${transitions.easeOut('0ms', 'left')}, ${transitions.easeOut('400ms', 'opacity')}`,
        });
    }
    return style;
}

class Overlay extends Component {
    static propTypes = {
        autoLockScrolling: PropTypes.bool,
        show: PropTypes.bool.isRequired,
        style: PropTypes.object,
        transitionEnabled: PropTypes.bool,
    };

    static defaultProps = {
        autoLockScrolling: true,
        style: {},
        transitionEnabled: true,
    };

    setOpacity(opacity) {
        this.refs.overlay.style.opacity = opacity;
    }

    render() {
        const {
            autoLockScrolling,
            show,
            style,
            transitionEnabled,
            ...other
        } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <div {...other }
            ref="overlay"
            className="overlay"
            > 
                { autoLockScrolling && <AutoLockScrolling lock={ show }/> }
            </div>
            );
        }
    }

    export default Overlay;
