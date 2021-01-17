import CartReducer from './CartReducer'
import ProductReducer from './ProductReducer'
import PromoReducer from './PromoReducer'
import OrderReducer from './OrderReducer'
import UserReducer from './UserReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    carts: CartReducer,
    products: ProductReducer,
    promos: PromoReducer,
    orders: OrderReducer,
    users: UserReducer,
})

export default rootReducer