//
const initialState = {
    version : '1.0.0',
    info : 'Application is ready',
    isAppBusy : false
}

const messages = (state=initialState, action)=>{
    switch(action.type){
        case 'NEW_STATUS' :
            return { ...state, isAppBusy: action.payload }
            //break
        case 'NEW_MESSAGE' :
            return { ...state, info: action.payload }
            //break
        default :
            return state
            //break
    }
}

export default messages