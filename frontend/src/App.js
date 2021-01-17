import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import AllProduct from './actions/Product/AllProduct'
import AllPromo from './actions/Promo/AllPromo'
import AllOrder from './actions/Order/AllOrder'
import EmptyPromo from './actions/Promo/EmptyPromo'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Products from './components/Products'
import Home from './components/Home'
import Cart from './components/Cart'
import Promo from './components/Promo'
import Checkout from './components/Checkout'
import Order from './components/Order'
import Login from './components/Login'
import test from './components/test'
import './App.css';

function App() {

  const dispatch = useDispatch()
  const stateRaw= useSelector(state => state)
  const [admin, setAdmin] = useState(true)

  useEffect(() => {
    async function fetchData() {
        const resultProducts = await axios.get(
            'http://localhost:3000/products',
        );

        const resultPromos = await axios.get(
          'http://localhost:3000/promotions', {
            headers: {
              'uid': stateRaw.users[0].uid
            }
          }
        );

        const resultOrders = await axios.get(
          'http://localhost:3000/orders',
        );

        dispatch(AllProduct(resultProducts.data.Products));
        try {
          if(resultPromos.data === "Not Found"){
            stateRaw.promos = []
            localStorage.clear()
            const serialisedState = JSON.stringify(stateRaw);
            localStorage.setItem("persistantState", serialisedState);
            dispatch(EmptyPromo());
            setAdmin(false)
          }else{
            dispatch(AllPromo(resultPromos.data.Promos));
            setAdmin(true)
          }
        } catch (error) {
          console.log("error")
          console.log(error)
        }
        dispatch(AllOrder(resultOrders.data.Order));
    }
    fetchData();
    
  }, [dispatch]);

  return (
    <div className="App">
          <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          {
            admin && (
                <Route path="/products" component={Products}></Route>
            )
          }
          <Route path="/cart" component={Cart}></Route>
          {
            admin && (
                <Route path="/promotions" component={Promo}></Route>
            )
          }
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Order}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/test" component={test}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
