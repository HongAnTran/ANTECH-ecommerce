import {
    call,
    put,
    
} from 'redux-saga/effects'
import * as api from '../../api/api'
import upImageSlice from '../../components/upImage/upImageSlice'


const imageSaga =  function*(action){
   
    try {
        const image = yield call(api.postImage,action.payload)
        if(image){
            yield put(upImageSlice.actions.addImageSuccess(image.data))
        }
    } catch (error) {
        yield put(upImageSlice.actions.addImageFailure(error))
    }
}

export default  imageSaga