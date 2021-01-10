import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import AllProduct from './actions/Product/AllProduct'
import AllPromo from './actions/Promo/AllPromo'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Products from './components/Products'
import Home from './components/Home'
import Cart from './components/Cart'
import Promo from './components/Promo'
import './App.css';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
        const resultProducts = await axios.get(
            'http://localhost:3000/products',
        );

        const resultPromos = await axios.get(
          'http://localhost:3000/promos',
      );

        dispatch(AllProduct(resultProducts.data.Products));
        dispatch(AllPromo(resultPromos.data.Promos));
    }
    fetchData();
    
  }, [dispatch]);

  return (
    <div className="App">
          <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/products" component={Products}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/promos" component={Promo}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
