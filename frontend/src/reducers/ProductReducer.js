const initState = []

const ProductReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALL_PRODUCT':

            const data = action.info
            return data

        case 'ADD_PRODUCT':

            const newProduct = [].concat(state, action.info.data.Product)
            return newProduct

        case 'EDIT_PRODUCT':

            const editProduct = state.findIndex(p => p._id === action.id)
            state[editProduct] = action.info.data.Product
            return state

        case 'DELETE_PRODUCT':

            const newStateAfterDelete = state.filter(d => d._id !== action.id.data.messenge)
            return newStateAfterDelete
            
        default:
            return state;
    }

}

export default ProductReducer