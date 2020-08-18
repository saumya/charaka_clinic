// RootReducer
// version - 1.0.0
//

import { combineReducers } from 'redux'

import messages from './messages.reducer'
import loginReducer from './login_reducer'
import clinicReducer from './clinic.reducer'


const theReducer = combineReducers({
    messages : messages,
    loginData : loginReducer,
    clinicData : clinicReducer
})

export default theReducer