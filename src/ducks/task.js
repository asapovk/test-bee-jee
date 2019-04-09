import {List, Record, OrderedMap} from 'immutable'
import {arrToMap, mapToArr, arrToMapDeep} from '../helpers'
import {createSelector} from 'reselect'
import axios from 'axios'
import {put, takeEvery, call, all, take} from 'redux-saga/effects'
import md5 from 'blueimp-md5'
import encode from 'encode-3986'

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
  totalNumber: 0
})


const taskRecord = Record({
  id: null,
  email: null,
  username: null,
  text: null,
  status: 0
})

export default function reducer (state = new reducerRecord(), action) {
  const {type, payload} = action
  switch (type) {
      case FETCH_TASK_SUCCESS:
        return state.update('tasks', entities => arrToMap(payload.tasks, taskRecord)).set('totalNumber', payload.total_task_count)
      case CREATE_TASK_SUCCESS:
        return state.update('tasks', entities => entities.set(payload.id, new taskRecord(payload)))
      case EDIT_TASK_SUCCESS:
        return state.updateIn(['tasks', payload.id], task =>  new taskRecord(payload))
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

export const pagesSelector = createSelector(
  state => state.taskReducer.totalNumber,
  (number) => {
    if( parseInt(number)/3 !== Math.floor(parseInt(number)/3)) {
      return Math.floor(parseInt(number)/3)+1
    }
    else {
      return parseInt(number)/3
    }
  }
)

///Sagas

const editTaskSaga = function*() {
  while(true) {
    const {payload} = yield take(EDIT_TASK_START)
    const {text, status, email, username} = payload.task
    const taskId = payload.taskId
    const token = 'beejee'
    try {

      const textEnc = encode(text)
      const statusEnc = encode(status)
      const tokenEnc = encode(token)
      console.log(text)
      console.log(status)
      console.log(tokenEnc)

      const string = 'status='+statusEnc+'&text='+textEnc+'&token='+tokenEnc
      const signature = md5(string)
      console.log(string)
      console.log(signature)
      var form = new FormData();
       form.append("text", text);
       form.append("status", status);
       form.append("signature", signature);
       form.append("token", token);

      const response =  yield axios.post('https://uxcandy.com/~shapoval/test-task-backend/edit/'+taskId, form, {params: {developer: 'asapovk'}} )
      console.log(response)
      yield put({
        type: EDIT_TASK_SUCCESS,
        payload: {id: taskId, text, status, email, username}
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
    const {username, email, text} = payload
    try {
      var form = new FormData();
       form.append("username", username);
       form.append("email", email);
       form.append("text", text);
      const response =  yield axios.post('https://uxcandy.com/~shapoval/test-task-backend/create', form, {params: {developer: 'asapovk'}})
      yield put({
        type: CREATE_TASK_SUCCESS,
        payload: response.data.message
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
    const sort_field = payload ? payload.sort_field : null
    const sort_direction = payload ? payload.sort_direction : null
    const page = payload ? payload.page : null
    console.log(sort_field)
    console.log(sort_direction)
    console.log(page)
    try {
        var response =  yield axios.get('https://uxcandy.com/~shapoval/test-task-backend/', {params: {developer: 'asapovk', sort_field, sort_direction, page}})
        yield put({
          type: FETCH_TASK_SUCCESS,
          payload: response.data.message
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
