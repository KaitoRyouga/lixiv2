const initState = []

const ProductReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALL_PROMO':
            const data = action.info
            return data
        case 'ADD_PROMO':
            const newPromo = [].concat(state, action.info)
            return newPromo
        default:
            return state;
    }

}

export default ProductReducer