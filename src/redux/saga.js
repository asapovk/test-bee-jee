import {all} from 'redux-saga/effects'
import {authSaga} from '../ducks/auth'
import {taskSaga} from '../ducks/task'



export const rootSaga = function* () {
  yield all([taskSaga(), authSaga()])
}
