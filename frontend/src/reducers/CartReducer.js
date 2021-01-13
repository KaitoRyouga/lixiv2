const initState = []

const CartReducer = (state = initState, action) => {

    switch (action.type) {
        case 'ADD_CART':
            const data = action.info
            const newData = state.filter(s =>s.name !== data[0].name)
            let NewCart

            if (data[0].quantity === 0) {
                NewCart = newData
            }else{
                NewCart = [].concat(newData, data)   
            }
            return NewCart
        case 'RESET_CART':
            return [];
        case 'EDIT_CART':
            let editCart = state.findIndex(c => c.id === action.id)
            state[editCart].quantity = state[editCart].quantity + action.count
            if (state[editCart].quantity <= 0) {
                let fixCart = state.filter(c => c.id !== action.id)
                return fixCart
            }

            return state
        case 'DELETE_CART':
            const newCart = state.filter(s => s.id !== action.id)
            return newCart
        default:
            return state;
    }

}

export default CartReducer