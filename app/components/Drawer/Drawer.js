import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import transitions from '../_utils/transitions';
import Overlay from '../Overlay';
import Paper from '../Paper';

let openNavEventHandler = null;

class Drawer extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        containerStyle: PropTypes.object,
        disableSwipeToOpen: PropTypes.bool,
        docked: PropTypes.bool,
        onRequestChange: PropTypes.func,
        open: PropTypes.bool,
        openSecondary: PropTypes.bool,
        overlayClassName: PropTypes.string,
        overlayStyle: PropTypes.object,
        style: PropTypes.object,
        swipeAreaWidth: PropTypes.number,
        width: PropTypes.number,
        zDepth: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),

    };

    static defaultProps = {
        disableSwipeToOpen: false,
        docked: true,
        open: null,
        openSecondary: false,
        swipeAreaWidth: 30,
        width: 300,
        zDepth: 2,
    };

    componentWillMount() {
        this.maybeSwiping = false;
        this.touchStartX = null;
        this.touchStartY = null;
        this.swipeStartX = null;

        this.setState({
            open: (this.props.open !== null) ? this.props.open : this.props.docked,
            swiping: null,
        });
    }

    componentDidMount() {
        this.enableSwipeHandling();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== null) {
            this.setState({
                open: nextProps.open,
            });
        } else if (this.props.docked !== nextProps.docked) {
            this.setState({
                open: nextProps.docked,
            });
        }
    }

    componentDidUpdate() {
        this.enableSwipeHandling();
    }

    componentWillUnmount() {
        this.disableSwipeHandling();
    }

    getStyles() {

        const x = this.getTranslateMultiplier() * (this.state.open ? 0 : this.getMaxTranslateX());

        const styles = {
            root: {
                height: '100%',
                width: '301px',
                position: 'fixed',
                zIndex: 5,
                left: 0,
                top: 0,
                transform: `translate(${x}px, 0)`,
                transition: transitions.easeOut(null, 'transform', null),
                backgroundColor: '#ff9900',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
            },
            overlay: {
                zIndex: 5,
                pointerEvents: this.state.open ? 'auto' : 'none',
            },
            rootWhenOpenRight: {
                left: 'auto',
                right: 0,
            },
        };

        return styles;
    }

    shouldShow() {
        return this.state.open || !!this.state.swiping;
    }

    close(reason) {
        if (this.props.open === null) this.setState({ open: false });
        if (this.props.onRequestChange) this.props.onRequestChange(false, reason);
        return this;
    }

    open(reason) {
        if (this.props.open === null) this.setState({ open: true });
        if (this.props.onRequestChange) this.props.onRequestChange(true, reason);
        return this;
    }

    handleTouchTapOverlay = (event) => {
        event.preventDefault();
        this.close('clickaway');
    };

    handleKeyUp = (event) => {
        if (this.state.open && !this.props.docked && keycode(event) === 'esc') {
            this.close('escape');
        }
    };

    getMaxTranslateX() {
        const width = this.props.width;
        return width + 10;
    }

    getTranslateMultiplier() {
        return this.props.openSecondary ? 1 : -1;
    }

    enableSwipeHandling() {
        if (!this.props.docked) {
            document.body.addEventListener('touchstart', this.onBodyTouchStart);
            if (!openNavEventHandler) {
                openNavEventHandler = this.onBodyTouchStart;
            }
        } else {
            this.disableSwipeHandling();
        }
    }

    disableSwipeHandling() {
        document.body.removeEventListener('touchstart', this.onBodyTouchStart);
        if (openNavEventHandler === this.onBodyTouchStart) {
            openNavEventHandler = null;
        }
    }

    onBodyTouchStart = (event) => {
        const swipeAreaWidth = this.props.swipeAreaWidth;

        const touchStartX = event.touches[0].pageX;
        const touchStartY = event.touches[0].pageY;

        if (swipeAreaWidth !== null && !this.state.open) {
            if (this.props.openSecondary) {
                if (touchStartX < document.body.offsetWidth - swipeAreaWidth) return;
            } else {
                if (touchStartX > swipeAreaWidth) return;
            }
        }

        if (!this.state.open &&
            (openNavEventHandler !== this.onBodyTouchStart ||
                this.props.disableSwipeToOpen)
        ) {
            return;
        }

        this.maybeSwiping = true;
        this.touchStartX = touchStartX;
        this.touchStartY = touchStartY;

        document.body.addEventListener('touchmove', this.onBodyTouchMove);
        document.body.addEventListener('touchend', this.onBodyTouchEnd);
        document.body.addEventListener('touchcancel', this.onBodyTouchEnd);
    };

    setPosition(translateX) {
        const drawer = ReactDOM.findDOMNode(this.refs.clickAwayableElement);
        const transformCSS = `translate(${(this.getTranslateMultiplier() * translateX)}px, 0)`;
        this.refs.overlay.setOpacity(1 - translateX / this.getMaxTranslateX());
        autoPrefix.set(drawer.style, 'transform', transformCSS);
    }

    getTranslateX(currentX) {
        return Math.min(
            Math.max(
                this.state.swiping === 'closing' ?
                this.getTranslateMultiplier() * (currentX - this.swipeStartX) :
                this.getMaxTranslateX() - this.getTranslateMultiplier() * (this.swipeStartX - currentX),
                0
            ),
            this.getMaxTranslateX()
        );
    }

    onBodyTouchMove = (event) => {
        const currentX = event.touches[0].pageX;
        const currentY = event.touches[0].pageY;

        if (this.state.swiping) {
            event.preventDefault();
            this.setPosition(this.getTranslateX(currentX));
        } else if (this.maybeSwiping) {
            const dXAbs = Math.abs(currentX - this.touchStartX);
            const dYAbs = Math.abs(currentY - this.touchStartY);
            const threshold = 10;

            if (dXAbs > threshold && dYAbs <= threshold) {
                this.swipeStartX = currentX;
                this.setState({
                    swiping: this.state.open ? 'closing' : 'opening',
                });
                this.setPosition(this.getTranslateX(currentX));
            } else if (dXAbs <= threshold && dYAbs > threshold) {
                this.onBodyTouchEnd();
            }
        }
    };

    onBodyTouchEnd = (event) => {
        if (this.state.swiping) {
            const currentX = event.changedTouches[0].pageX;
            const translateRatio = this.getTranslateX(currentX) / this.getMaxTranslateX();

            this.maybeSwiping = false;
            const swiping = this.state.swiping;
            this.setState({
                swiping: null,
            });

            if (translateRatio > 0.5) {
                if (swiping === 'opening') {
                    this.setPosition(this.getMaxTranslateX());
                } else {
                    this.close('swipe');
                }
            } else {
                if (swiping === 'opening') {
                    this.open('swipe');
                } else {
                    this.setPosition(0);
                }
            }
        } else {
            this.maybeSwiping = false;
        }

        document.body.removeEventListener('touchmove', this.onBodyTouchMove);
        document.body.removeEventListener('touchend', this.onBodyTouchEnd);
        document.body.removeEventListener('touchcancel', this.onBodyTouchEnd);
    };

    render() {
        const {
            children,
            className,
            containerClassName,
            containerStyle,
            docked,
            openSecondary,
            overlayClassName,
            overlayStyle,
            style,
            zDepth,
        } = this.props;

        const styles = this.getStyles();

        let overlay;
        if (!docked) {
            overlay = ( <Overlay ref = "overlay"
                show = { this.shouldShow() }
                className = { overlayClassName }
                style = { Object.assign(styles.overlay, overlayStyle) }
                transitionEnabled = {!this.state.swiping }
                >fdfsdf</Overlay>
            );
        }

        return ( 
            <div className = { className } style = { style }>
                { overlay }
                <Paper
                  ref="clickAwayableElement"
                  zDepth={zDepth}
                  rounded={false}
                  transitionEnabled={!this.state.swiping}
                  className={containerClassName}
                  style={Object.assign(styles.root, openSecondary && styles.rootWhenOpenRight, containerStyle)}
                >
                    {children}
                </Paper>
            </div>
        );
    }
}

export default Drawer;
