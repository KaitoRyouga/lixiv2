import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import AllProduct from './actions/Product/AllProduct'
import AllPromo from './actions/Promo/AllPromo'
import AllOrder from './actions/Order/AllOrder'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Products from './components/Products'
import Home from './components/Home'
import Cart from './components/Cart'
import Promo from './components/Promo'
import Checkout from './components/Checkout'
import Order from './components/Order'
import Login from './components/Login'
import test from './components/test'
import HeaderRaw from './components/Header'
import './App.css';
import { Layout } from 'antd'

function App() {

  const { Header, Content, Footer, Sider } = Layout;

  const dispatch = useDispatch()
  const stateUser = useSelector(state => state.users)
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    async function fetchData() {
        const resultProducts = await axios.get(
            `http://${process.env.REACT_APP_API}:3000/products`,
        );

        const resultPromos = await axios.get(
          `http://${process.env.REACT_APP_API}:3000/promotions`
        );

        const resultOrders = await axios.get(
          `http://${process.env.REACT_APP_API}:3000/orders`,
        );

        const resultAdmin = await axios.get(
          `http://${process.env.REACT_APP_API}:3000/admin`, {
            headers: {
              'uid': stateUser[0].uid
            }
          }
      );
      setAdmin(resultAdmin.data.admin);

        dispatch(AllProduct(resultProducts.data.Products));
        dispatch(AllPromo(resultPromos.data.Promos));
        dispatch(AllOrder(resultOrders.data.Order));
    }
    fetchData();
    
  }, [stateUser]);

  return (
    <Layout className="App">
          <BrowserRouter>
          <Header>
            <HeaderRaw></HeaderRaw>
          </Header>
        <Switch>
        <Content>
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
          </Content>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
