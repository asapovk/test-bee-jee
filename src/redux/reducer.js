import taskReducer from '../ducks/task'
import authReducer from '../ducks/auth'
import {combineReducers} from 'redux'

const reducer = combineReducers({taskReducer, authReducer})
export default reducer
