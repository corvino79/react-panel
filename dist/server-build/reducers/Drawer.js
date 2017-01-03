import * as ActionType from 'actions/questions'
import _ from 'lodash'
import Immutable from 'immutable'

let defaultState = Immutable.fromJS({
  open: null
})

export default function(state = defaultState, action) {
	switch(action.type) {
		case ActionType.OPEN_DRAWER:
		  	return Object.assign({}, state, {open: action.payload})
			break;
		case ActionType.CLOSE_DRAWER:
		  	return Object.assign({}, state, {open: action.payload})
		  	break;
		default:
		return state
	}
}
