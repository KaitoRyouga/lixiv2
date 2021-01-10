const initState = []

const ProductReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALL_PRODUCT':
            const data = action.info
            return data
        case 'ADD_PRODUCT':
            console.log(state)
            console.log(action)
            const newProduct = [].concat(state, action.info)
            return newProduct
        default:
            return state;
    }

}

export default ProductReducer