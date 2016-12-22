import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadQuestions } from 'actions/questions'
import Questions from 'components/Questions'
import Button from '../components/Button'
import GoogleAd from '../components/googleAds'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

class Intro extends Component {
  static propTypes = {
    client: PropTypes.string,
    slot: PropTypes.string,
    format: PropTypes.string,
    wrapperDivStyle: PropTypes.object
  }

  static fetchData({ store }) {
    return store.dispatch(loadQuestions())
  }

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    this.props.loadQuestions();
  }
  render() {
    const style = {
      marginTop: '15px',
      marginBottom: '20px'
    };
    return (
      <div key="intro" className="intro">
        <Helmet
          title="Intro"
        />
        <Button href="/container">
            Lista
        </Button>
        <GoogleAd 
          client="ca-pub-xxxxxxxxxx" 
          slot="xxxxxxxxxx" 
          format="auto" 
          wrapperDivStyle={style}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { questions: state.questions }
}

export { Intro }
export default connect(mapStateToProps, { loadQuestions })(Intro)
