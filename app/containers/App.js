import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Header from '../Components/Header'
import Drawer from '../Components/Drawer'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, open: false }
        this.enterLoading = this.enterLoading.bind(this);
    }
    enterLoading() {
        this.setState({ loading: true });
    }

    handleTouchTapOpen = (event) => {
        event.preventDefault();
        this.setState({ open: true });
    }


  render() {
    return (
    <div>
        <Helmet defaultTitle="Panel Compropago" titleTemplate="%s" htmlAttributes={{"lang": "en"}}
          meta={[
            {"name": "description", "content": "Panel Compropago"},
          ]}
        />
        <Header handleTouchTapOpen={this.handleTouchTapOpen}></Header>
        <Drawer className="side-nav fixed" docked={false} width={300} open={this.state.open}>
            <div>fgdfgdfg</div>
        </Drawer>
        <div className="container">
            {this.props.children}
        </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App)
