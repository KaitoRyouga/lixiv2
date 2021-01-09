import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import AllProduct from './actions/Product/AllProduct'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Products from './components/Products'
import Home from './components/Home'
import Cart from './components/Cart'
import './App.css';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
        const result = await axios.get(
            'http://localhost:3000/products',
        );
        dispatch(AllProduct(result.data.Products));
        // console.log(result.data.Products)
    }
    fetchData();
    
  }, []);

  return (
    <div className="App">
          <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/products" component={Products}></Route>
          <Route path="/cart" component={Cart}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
