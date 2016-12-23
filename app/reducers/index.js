import { combineReducers } from 'redux'
import questions from 'reducers/questions'
import questionDetail from 'reducers/questionDetail'
import drawer from 'reducers/Drawer'

const rootReducer = combineReducers({
  questions,
  questionDetail,
	drawer
})

export default rootReducer
