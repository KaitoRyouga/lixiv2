const initState = []

const OrderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALL_ORDER':

            const data = action.info
            return data

        case 'ADD_ORDER':

            const newOrder = [].concat(state, action.info.data.Order)
            return newOrder

        case 'EDIT_ORDER':

            const editOrder = state.findIndex(p => p._id === action.id)
            state[editOrder].status = action.info.data.Order.status
            return state
            
        default:
            return state;
    }

}

export default OrderReducer