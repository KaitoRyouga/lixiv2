import CartReducer from './CartReducer'
import ProductReducer from './ProductReducer'
import PromoReducer from './PromoReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    carts: CartReducer,
    products: ProductReducer,
    promos: PromoReducer,
})

export default rootReducer