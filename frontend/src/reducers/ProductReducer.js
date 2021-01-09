const initState = []

const ProductReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALL_PRODUCT':
            const data = action.info
            return data
    
        default:
            return state;
    }

}

export default ProductReducer