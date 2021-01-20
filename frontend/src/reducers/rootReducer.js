import CartReducer from './CartReducer'
import ProductReducer from './ProductReducer'
import PromoReducer from './PromoReducer'
import OrderReducer from './OrderReducer'
import UserReducer from './UserReducer'
import PromotionReducer from './PromotionReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    carts: CartReducer,
    products: ProductReducer,
    promos: PromoReducer,
    orders: OrderReducer,
    users: UserReducer,
    promotion: PromotionReducer,
})

export default rootReducer