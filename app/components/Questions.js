import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { List } from 'immutable'

class Questions extends Component {
  render() {
    return (
      <div>
        Lista de usuarios
        {
          this.props.questions.map((q)=> {
            let id = q.get('id')
            return (
              <div key={id}>
                <Link to={`/container/${id}`}> { q.get('content') }</Link>
              </div>
            )
          })
        }
        <Link to={`/container/not-found`}> Este link redirecciona al Home</Link>
      </div>
    )
  }
}

Questions.propTypes = {
  questions: PropTypes.instanceOf(List).isRequired
}

export default Questions
