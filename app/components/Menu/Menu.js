import React, { Component, PropTypes } from 'react';

class Header extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
	        <ul id="nav-mobile" className="side-nav fixed" style={"transform: translateX(0%);"}>
		        <li className="bold"><a href="showcase.html" className="waves-effect waves-teal">Vitrina</a></li>
		    </ul>
        );
    }
}

export default Header;
