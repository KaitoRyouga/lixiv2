import axios from 'axios'

const initState = {

    product: [
        // {
        //     _id: "0",
        //     name: "Ao 1",
        //     quantity: 1,
        //     image: undefined,
        //     createdAt: undefined,
        //     updatedAt: undefined
        // }
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


const rootReducer = async (state = initState, action) => {
    
    const products = await axios.get("http://localhost:3000/products")
    // console.log()
    

    // let newState = [].concat(product.data.Products, state.product)
    // console.log(newState)
    console.log(action.info)

    try {
        if(action.type === "ADD_PRODUCT"){
            await axios.post('http://localhost:3000/products', action.info[0]).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            });

            // const products = await axios.get("http://localhost:3000/products")

            return {
                ...state,
                product: products.data.Products
            }
        }

        return {
            ...state,
            product: products.data.Products
        }
    } catch (error) {
        return error
    }
}

export default rootReducer