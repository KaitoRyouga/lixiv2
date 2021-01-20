const initState = []

const ProductReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PROMOTION':

            return action.info

        case 'DELETE_PROMOTION':

            return []
            
        default:
            return state;
    }

}

export default ProductReducer