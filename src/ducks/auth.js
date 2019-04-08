import {List, Record, OrderedMap} from 'immutable'
import {arrToMap, mapToArr, arrToMapDeep} from '../helpers'
import {createSelector} from 'reselect'
import axios from 'axios'
import {put, takeEvery, call, all, take} from 'redux-saga/effects'


export const SIGN_OUT_START = 'auth/SIGN_OUT_START'
export const SIGN_OUT_REJECTED = 'auth/SIGN_OUT_REJECTED'
export const SIGN_OUT_SUCCESS = 'auth/SIGN_OUT_SUCCESS'


export const SIGN_IN_START = 'auth/SIGN_IN_START'
export const SIGN_IN_REJECTED = 'auth/SIGN_IN_REJECTED'
export const SIGN_IN_SUCCESS = 'auth/SIGN_IN_SUCCESS'



const reducerRecord = Record({
  userName: null
})

// Reducer

export default function reducer (state = new reducerRecord(), action) {
  const {type, payload} = action
  switch (type) {
      case SIGN_IN_SUCCESS:
        return state.set('userName', payload)
      case SIGN_OUT_SUCCESS:
        return state.set('userName', null)
      default:
        return state;
  }
}


// Action creators

export const signIn = ({username, password}) => {
  return {
    type: SIGN_IN_START,
    payload: {username, password}
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT_START,
  }
}

// Selectors

export const userSelector = createSelector(
  (state) => state.authReducer.userName,
  (userName) => (userName)
)


//Sagas

export const getAuthFromStorage = () => {
  const storedData = window.localStorage.getItem('auth')
  if(storedData) {
    window.store.dispatch({
      type: SIGN_IN_SUCCESS,
      payload: storedData
    })
  }
}

export const  authSaga = function* () {
  yield all([signInSaga(), signOutSaga()])
}

const signInSaga = function* () {
  while(true) {
    const {payload} = yield take(SIGN_IN_START)
      const {username, password} = payload
      const check = yield call(checkCredentials, {username, password})
      if (check) {
        yield put({
          type: SIGN_IN_SUCCESS,
          payload: username
        })
        yield call(saveObjToStorage, username)
      }
      else {
        yield put({
          type: SIGN_IN_REJECTED,
          paylod: 'failed to login'
        })
      }
}

const signOutSaga = function* () {
  while (true) {
    const action = yield take(SIGN_OUT_START)
    yield call(clearLocalStorage)
    yield put({
      type: SIGN_OUT_SUCCESS
    })
  }
}



const checkCredentials = (obj) => {
  const {username, password} = obj
  if (username === 'admin' && password === '123') {
    return true
  }
  else return false
}


const saveObjToStorage = (dataString) => {
  window.localStorage.setItem('auth', dataString)
}


const clearLocalStorage = () => {
  window.localStorage.clear()
}
