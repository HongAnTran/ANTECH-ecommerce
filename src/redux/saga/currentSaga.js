import {
    call,
    put,
    
} from 'redux-saga/effects'
import * as api from '../../api/api'
import currentUserSlice from '../../features/modals/currentUserSlice'
const getCurrentSaga =  function*(action){
    try {
        const currentUser = yield call(api.getCurrentUser,action.payload)
        if(currentUser){
            yield put(currentUserSlice.actions.setCurrentUserSuccess(currentUser.data[0]))
        }
    } catch (error) {
        yield put(currentUserSlice.actions.setCurrentUserFailure(error))
    }
}

export const editCurrentUserSaga =  function*(action){
    try {
        const currentUser = yield call(api.editUser,action.payload)
        console.log(currentUser)
        if(currentUser){
            yield put(currentUserSlice.actions.editUserSuccess(currentUser.data))
        }
    } catch (error) {
        yield put(currentUserSlice.actions.editUserFailure(error))
    }
}

export default  getCurrentSaga