import {List, Record, OrderedMap} from 'immutable'
import {arrToMap, mapToArr, arrToMapDeep} from '../helpers'
import {createSelector} from 'reselect'
import axios from 'axios'
import {put, takeEvery, call, all, take} from 'redux-saga/effects'

export const FETCH_TASK_START = 'task/FETCH_TASK_START'
export const FETCH_TASK_REJECTED = 'task/FETCH_TASK_REJECTED'
export const FETCH_TASK_SUCCESS = 'task/FETCH_TASK_SUCCESS'

export const CREATE_TASK_START = 'task/CREATE_TASK_START'
export const CREATE_TASK_REJECTED = 'task/CREATE_TASK_REJECTED'
export const CREATE_TASK_SUCCESS = 'task/CREATE_TASK_SUCCESS'

export const EDIT_TASK_START = 'task/EDIT_TASK_START'
export const EDIT_TASK_REJECTED = 'task/EDIT_TASK_REJECTED'
export const EDIT_TASK_SUCCESS = 'task/EDIT_TASK_SUCCESS'


const reducerRecord = Record({
  tasks: new OrderedMap({}),
})


const taskRecord = Record({
  status: null,
  user: null,
  text: null
})

export default function reducer (state = new reducerRecord(), action) {
  const {type, payload} = action
  switch (type) {
      case FETCH_TASK_SUCCESS:
        return state.update('tasks', entities => arrToMap(payload, taskRecord))
      case
      default:
        return state;
  }
}

/// Action creators

export const fetchTask = (params) => {
  return {
    type: FETCH_TASK_START,
    payload: params
  }
}

export const createTask = (data) => {
  return {
    type: CREATE_TASK_START,
    payload: data
  }
}

export const editTask = (data) => {
  return {
      type: EDIT_TASK_START,
      payload: data
  }
}


/// Selectors

export const taskSelector = createSelector(
  state => state.taskReducer.tasks,
  entities => {
    try {
      return mapToArr(entities).map( entitie => entitie.toJS())
    } catch (e) {
      return null
    }
  }
)

///Sagas

const editTaskSaga = function*() {
  while(true) {
    const {payload} = yield take(EDIT_TASK_START)
    const data = payload.data || payload
    const taskId = payload.taskId || null
    const token = 'testToken'
    try {
      const response =  yield axios.post('/task/'+taskId, data)
      yield put({
        type: EDIT_TASK_SUCCESS,
        payload: response.data
      })
    } catch(e) {
      yield put({
        type: EDIT_TASK_REJECTED,
        payload: e
      })
    }

  }
}




const createTaskSaga = function*() {
  while(true) {
    const {payload} = yield take(CREATE_TASK_START)
    const data = payload
    const token = 'testToken'
    try {
      const response =  yield axios.post('/task', data)
      yield put({
        type: CREATE_TASK_SUCCESS,
        payload: response.data
      })
    } catch(e) {
      yield put({
        type: CREATE_TASK_REJECTED,
        payload: e
      })
    }

  }
}




const fetchTaskSaga = function*() {
  while(true) {
    const {payload} = yield take(FETCH_TASK_START)
    const token = payload && payload.user ? payload.user.jwt : null
    const wordId = payload? payload.wordId : null
    try {
        var response =  yield axios.get('/task')
        yield put({
          type: FETCH_TASK_SUCCESS,
          payload: response.data
        })
    } catch(e) {
      yield put({
        type: FETCH_TASK_REJECTED,
        payload: e
      })
    }
  }
}


export const  taskSaga = function* () {
  yield all([fetchTaskSaga(), createTaskSaga(), editTaskSaga()])
}
