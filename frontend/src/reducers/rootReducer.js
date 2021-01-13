import CartReducer from './CartReducer'
import ProductReducer from './ProductReducer'
import PromoReducer from './PromoReducer'
import OrderReducer from './OrderReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    carts: CartReducer,
    products: ProductReducer,
    promos: PromoReducer,
    orders: OrderReducer
})

export default rootReducer