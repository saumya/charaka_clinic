//
import ApiObj from '../utils/api'
import { changeBusyStatus } from '.'

const call_clinicLoginAPI = loginObj=>{
    //console.log( 'call_clinicLoginAPI' )
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.post.loginClinic
    //console.log( 'call_clinicLoginAPI', loginObj )
    //console.log( 'call_clinicLoginAPI', url_1 )
    const fetch_data = {
        method: 'POST', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(loginObj)
    }
    return fetch(url_1, fetch_data)
}
export const loginAction = loginObj=>(
    function(dispatch){
        dispatch( changeBusyStatus(true) )
        call_clinicLoginAPI(loginObj).then( success=>{
            //console.log( 'success', success )
            
            success.json().then( result=>{
                console.log(result)
                dispatch( changeBusyStatus(false) )
                
                if( result.result === 'SUCCESS'){
                    //const loginUserObj = result.data
                    //const stillActive = result.isStillActive
                    dispatch( loginSuccessAction(result) )
                }else if( result.result === 'FAIL'){
                    dispatch( loginFailAction() )
                }
                

            }, error_2=>{
                console.log('loginAction : Error 2 :')
                console.log(error_2)
                dispatch( changeBusyStatus(false) )
            })

        }, error_1=>{
            console.log('loginAction : Error 1 : ')
            console.log(error_1)
        })
    }
)
export const logoutAction = ()=>({type: 'LOGOUT'})

//
const loginSuccessAction = loggedInUserObj=>({
    type: 'LOGIN_ACTIVE',
    payload: {
        isLoggedIn: true,
        isActive: loggedInUserObj.isStillActive,
        loginUser: loggedInUserObj.data
    }
})
const loginFailAction = ()=>({type: 'LOGIN_FAIL'})