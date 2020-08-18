//
const initialState = {
    isLoggedIn : false,
    isActive : false,
    loginUser : {}
}

const loginReducer = (state=initialState, action)=>{
    switch (action.type){
        case 'LOGIN_ACTIVE' :
            return ({ ...state, isLoggedIn: action.payload.isLoggedIn, isActive: action.payload.isActive, loginUser: action.payload.loginUser })
        case 'LOGIN_FAIL' :
            return ({ ...state, isLoggedIn: false, isActive: false })
        case 'LOGOUT':
            return ({ ...state, isLoggedIn: false, isActive: false, loginUser: {} })
        default :
            return state
    }
}

export default loginReducer