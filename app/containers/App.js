import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Header from '../Components/Header'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false }
    this.enterLoading = this.enterLoading.bind(this);
  }
  enterLoading() {
    this.setState({ loading: true });
  }
  render() {
    return (
      <div>
        <Helmet
          defaultTitle="Redux real-world example"
          titleTemplate="%s - Redux real-world example"
          meta={[
            {"name": "description", "content": "A boilerplate doing universal/isomorphic rendering with Redux + React-router + Express"},
          ]}
          htmlAttributes={{"lang": "en"}}
        />
          <Header></Header>
          {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App)
