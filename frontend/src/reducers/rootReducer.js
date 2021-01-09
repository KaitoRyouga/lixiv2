import CartReducer from './CartReducer'
import ProductReducer from './ProductReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    carts: CartReducer,
    products: ProductReducer
})

export default rootReducer