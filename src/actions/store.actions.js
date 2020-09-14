//
import ApiObj from '../utils/api'
import { changeBusyStatus, updateInfoMessage } from './message.action'

// ========= createNewStoreItem_action =================================================
const call_CreateNewStoreItemAPI = (newItem)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.post.create_new_store_item
    const fetch_data = {
        method: 'POST', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(newItem)
    }
    return fetch(url_1,fetch_data)
}
export const createNewStoreItem_action = newItem =>(
    dispatch => {
        call_CreateNewStoreItemAPI(newItem).then( success=>{
            
            success.json().then( result=>{
                console.log( result )
            }, error_2=>{
                console.log('call_CreateNewStoreItemAPI : ERROR 2 :')
                console.log( error_2 )
            })

        }, error_1=>{
            console.log('call_CreateNewStoreItemAPI : ERROR 1 :')
            console.log( error_1 )
        })
    }
)

// ========= createNewStoreItem_action / ===============================================