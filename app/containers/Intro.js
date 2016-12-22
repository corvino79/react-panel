import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadQuestions } from 'actions/questions'
import Questions from 'components/Questions'
import Button from '../components/Button'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

class Intro extends Component {

    static fetchData({ store }) {
        return store.dispatch(loadQuestions())
    }

    componentDidMount() {
        this.props.loadQuestions();
    }

    render() {
        return ( 
            <div key="intro"
                className="intro">
                <Helmet defaultTitle="Panel Compropago"
                titleTemplate="%s"
                htmlAttributes={ { "lang": "en" } }
                    meta = {
                        [
                            { "name": "description", "content": "Panel Compropago" },
                        ]
                    }
                /> 
                <Button href="/container">
                Lista 
                </Button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { questions: state.questions }
}

export { Intro }
export default connect(mapStateToProps, { loadQuestions })(Intro)

