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
        dispatch( changeBusyStatus(true) )
        call_CreateNewStoreItemAPI(newItem).then( success=>{
            success.json().then( result=>{
                dispatch( changeBusyStatus(false) )
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

// ========= getAllStoreItems_action  ===============================================
const call_GetAllStoreItems_API = ()=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.get.all_storeItems
    const fetch_data = { method: 'GET', mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }) }
    return fetch(url_1, fetch_data)
}
export const getAllStoreItems_action = ()=>(
    dispatch=>{
        call_GetAllStoreItems_API().then( success=>{
            success.json().then( result=>{
                console.log('RESULT', result)
                dispatch( updateAllStoreItems(result) )
            }, error_2=>{
                console.log('call_GetAllStoreItems_API : ERROR 2 :')
                console.log( error_2 )
            })
        }, error_1=>{
            console.log('call_GetAllStoreItems_API : ERROR 1 :')
            console.log(error_1)
        })
    }
)
// ========= getAllStoreItems_action / ===============================================

const updateAllStoreItems = storeItems=>({ type: 'UPDATE_ALL_STORE_ITEMS', payload: storeItems })


// ========================= BUY ==================================
const call_createBuyItemAPI = (newBuy)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.post.buy_item
    const fetch_data = {
        method: 'POST', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(newBuy)
    }
    return fetch(url_1,fetch_data)
}
export const createNewBuy_action = (newBuy)=>(
    dispatch => {
        dispatch( changeBusyStatus(true) )
        call_createBuyItemAPI(newBuy).then( success=>{
            success.json().then( result=>{
                dispatch( changeBusyStatus(false) )
                console.log('RESULT', result)
                //dispatch( updateAllStoreItems(result) )
            }, error_2=>{
                console.log('call_GetAllStoreItems_API : ERROR 2 :')
                console.log( error_2 )
            })
        }, error_1=>{
            console.log('call_createBuyItemAPI : ERROR 1 :')
            console.log( error_1 )
        })

    }
)

// ========================= BUY / ================================

// ========================= SELL ====================================
const call_createSellItemAPI = (newSell)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.post.sell_item
    const fetch_data = {
        method: 'POST', 
        mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(newSell)
    }
    return fetch(url_1,fetch_data)
}
export const createNewSell_action = (newSell)=>(
    dispatch => {
        dispatch( changeBusyStatus(true) )
        call_createSellItemAPI(newSell).then( success=>{
            success.json().then( result=>{
                dispatch( changeBusyStatus(false) )
                console.log('RESULT', result)
                //dispatch( updateAllStoreItems(result) )
            }, error_2=>{
                console.log('call_GetAllStoreItems_API : ERROR 2 :')
                console.log( error_2 )
            })
        }, error_1=>{
            console.log('call_createBuyItemAPI : ERROR 1 :')
            console.log( error_1 )
        })
    }
)
// ========================= SELL / ==================================

// ========================= Item Transaction Details ====================================
const updateBuySellDetails = result=>({ type: 'UPDATE_IN_OUT_DETAILS', payload: result })
const call_transactionsOfItem_api = (itemId)=>{
    const url_1 = ApiObj.endpoint + ApiObj.version + ApiObj.get.all_transactions_of_item_with_id + itemId
    const fetch_data = { method: 'GET', mode: 'cors', headers: new Headers({ 'Content-Type': 'application/json' }) }
    return fetch(url_1, fetch_data)
}
export const getTransactionsOfItemId_action = (itemId)=>(
    dispatch => {
        call_transactionsOfItem_api(itemId).then( success=>{
            success.json().then( result=>{
                console.log('RESULT', result)
                dispatch( updateBuySellDetails(result) )
            }, error_2=>{
                console.log('call_transactionsOfItem_api : ERROR 2 :')
                console.log( error_2 )
            })
        }, error_1=>console.log('error_1 : ', error_1) )
    }
)
// ========================= Item Transaction Details / ==================================