import taskReducer from '../ducks/task'
import authReducer from '.../ducks/auth'

const reducer = combineReducers({taskReducer, authReducer})
export default reducer
