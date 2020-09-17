//
const initialState = {
    storeItems: [],
    itemBought: [],
    itemSold: []
}

const StoreItemsReducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_ALL_STORE_ITEMS':
            return ({ ...state, storeItems: action.payload })
        case 'UPDATE_IN_OUT_DETAILS':
            return ({ ...state, itemBought: action.payload.buy, itemSold: action.payload.sell })
        default :
            return state
    }
}


export default StoreItemsReducer