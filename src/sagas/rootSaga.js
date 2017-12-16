import {takeEvery} from 'redux-saga'
import {put, all} from 'redux-saga/effects'

const saga = function* () {
    console.log('Dispatching SAGA_CHANGE action')
    let result = yield new Promise((resolve, reject) => {
        resolve("Promise")
    })
    yield put({type:'SAGA_CHANGE',payload:{name:result}})
}
export default function* () {
    yield all([takeEvery('CHANGE',saga)])
}
