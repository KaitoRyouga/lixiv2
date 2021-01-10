const initState = []

const CartReducer = (state = initState, action) => {

    switch (action.type) {
        case 'ADD_CART':
            const data = action.info
            const newData = state.filter(s =>s.name !== data[0].name)
            let NewCart

            if (data[0].quantity === 0) {
                NewCart = state
            }else{
                NewCart = [].concat(newData, data)   
            }
            return NewCart
        case 'RESET_CART':
            return [];
        default:
            return state;
    }

}

export default CartReducer