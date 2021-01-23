const initState = []

const ProductReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALL_PROMO':

            const data = action.info
            return data

        case 'ADD_PROMO':

            const newPromo = [].concat(state, action.info.data.Promo)
            return newPromo

        case 'EDIT_PROMO':

            const editPromo = state.findIndex(p => p._id === action.id)
            state[editPromo] = action.info.data.Promo
            return state

        case 'DELETE_PROMO':

            const newStateAfterDelete = state.filter(d => d._id !== action.id.data.messenge)
            return newStateAfterDelete

        case 'EMPTY_PROMO':

            return []
            
        default:
            return state;
    }

}

export default ProductReducer