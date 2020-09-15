// RootReducer
// version - 1.0.0
//

import { combineReducers } from 'redux'

import messages from './messages.reducer'
import loginReducer from './login_reducer'
import clinicReducer from './clinic.reducer'
import storeItemsReducer from './storeItems.reducer'


const theReducer = combineReducers({
    messages : messages,
    loginData : loginReducer,
    clinicData : clinicReducer,
    storeData : storeItemsReducer
})

export default theReducer