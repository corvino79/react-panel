import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Header from '../Components/Header'
import Drawer from '../Components/Drawer'
import Button from '../components/Button'
import { openDrawer, closeDrawer } from '../actions/questions'

class App extends Component {
    constructor(props) {
        super(props);
        this.handleTouchTapOpen = this.handleTouchTapOpen.bind(this);
    }

    handleTouchTapOpen = (event) => {
        event.preventDefault();
        if (this.props.Open)
          this.props.closeDrawer();
        else
          this.props.openDrawer(this.props.Open);
    }


  render() {
    return (
    <div>
        <Helmet defaultTitle="Panel Compropago" titleTemplate="%s" htmlAttributes={{"lang": "en"}}
          meta={[
            {"name": "description", "content": "Panel Compropago"},
          ]}
        />
        <Header>
          <Button onTouchTap={this.handleTouchTapOpen}>
                Menu 
          </Button>
        </Header>
        <Drawer className="side-nav fixed" docked={false} width={300} open={this.props.Open}>
            <div>fgdfgdfg</div>
        </Drawer>
        <div className="container">
            {this.props.children}
        </div>
    </div>
    )
  }
}

function mapDispathToProps(dispatch) {
  return {
    openDrawer: () => {
        dispatch(openDrawer())
    },
    closeDrawer: () => {
        dispatch(closeDrawer())
    }
  }
}

function mapStateToProps(state) {
  return {
    Open: state.drawer.open
  }
}

export default connect(mapStateToProps, mapDispathToProps)(App)
