import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import { Layout } from 'antd'
import './App.css';

import AllProduct from './actions/Product/AllProduct'
import AllPromo from './actions/Promo/AllPromo'
import AllOrder from './actions/Order/AllOrder'
import Products from './components/Products'
import Home from './components/Home'
import Cart from './components/Cart'
import Promo from './components/Promo'
import Checkout from './components/Checkout'
import Order from './components/Order'
import Login from './components/Login'
import HeaderRaw from './components/Header'
import FooterRaw from './components/Footer'
import MessengerCustomerChat from 'react-messenger-customer-chat';

function App() {
  
  const { Header, Content, Footer } = Layout;
  const dispatch = useDispatch()
  const stateUser = useSelector(state => state.users)
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    async function fetchData() {
      
      const linkApi = `${process.env.REACT_APP_API}/allinfo`

      const allInfo = await axios.get(
        linkApi, {
          headers: {
            'uid': stateUser[0].uid
          }
        }
      );

      const info = allInfo.data.allInfo

      setAdmin(info[3].Admin);
      dispatch(AllProduct(info[1].Product));
      dispatch(AllPromo(info[2].Promo));
      dispatch(AllOrder(info[0].Order));
    }
    fetchData();
    
  }, [stateUser]);

  return (
    <Layout className="App">
      <BrowserRouter>
        <Header>
          <HeaderRaw></HeaderRaw>
        </Header>
        <Content>
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
          </Switch>
          <MessengerCustomerChat
            pageId="102235194617391"
            appId="446677652971923"
          />
        </Content>
        <Footer>
            <FooterRaw></FooterRaw>
        </Footer>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
