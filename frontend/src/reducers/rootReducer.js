// import axios from 'axios'

const initState = {

    product: [
        {
            _id: "0",
            name: "Ao 1",
            quantity: 1,
            image: undefined,
            createdAt: undefined,
            updatedAt: undefined
        }
    ], 
    cart: [
        {
            _id: "0",
            product: []
        }
    ]
}


// const pro = async () => {
//     return await axios.get('http://localhost:3000/products');
// }


const rootReducer = (state = initState, action) => {
    
    

    // let newState = [].concat(product.data.Products, state.product)
    // console.log(newState)

    try {
        if(action.type === "ADD_PRODUCT"){
            action.info.key = state.product.length + 1
            action.info.index = state.product.length + 1
            let NewProduct = [].concat(state.product, action.info)
            return{
                ...state,
                product: NewProduct
            }
        }

        return state
    } catch (error) {
        return error
    }
}

export default rootReducer