//
const initialState = {
    storeItems: []
}

const StoreItemsReducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_ALL_STORE_ITEMS':
            return ({ ...state, storeItems: action.payload })
        default :
            return state
    }
}


export default StoreItemsReducer