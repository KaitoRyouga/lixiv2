const initState = []

const OrderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALL_ORDER':
            const data = action.info
            return data
        // case 'ADD_PRODUCT':
        //     const newProduct = [].concat(state, action.info)
        //     return newProduct
        default:
            return state;
    }

}

export default OrderReducer