const initState = []

const CartReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            const data = action.info
            const newData = state.filter(s =>s.name !== data[0].name)

            let NewCart = [].concat(newData, data)
            return NewCart
    
        default:
            return state;
    }

}

export default CartReducer